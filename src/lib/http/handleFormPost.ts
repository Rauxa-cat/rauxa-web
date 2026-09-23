import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { getClientIp } from './getClientIp';
import { limitContactByIp } from '@/lib/security/ratelimit';

type TemplateEnv =
  | 'BREVO_CONTACT_TEMPLATE_ID'
  | 'BREVO_SERVICE_TEMPLATE_ID'
  | 'BREVO_JOIN_TEMPLATE_ID';

// The error keys resolve against `contact.form` on the client, which every form shares.
export async function handleFormPost<S extends z.ZodType>(
  req: Request,
  {
    schema,
    templateEnv,
    send,
  }: {
    schema: S;
    templateEnv: TemplateEnv;
    send: (
      data: z.output<S>,
      templateId: number,
    ) => Promise<{ messageId?: string } | undefined>;
  },
) {
  try {
    const ip = getClientIp(req);
    const { success } = await limitContactByIp(ip);
    if (!success) {
      return NextResponse.json(
        { ok: false, errorKey: 'api.contact.rateLimited' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const companyError = parsed.error.issues.find(
        (issue) => issue.path[0] === 'company',
      );

      if (companyError) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        {
          ok: false,
          errorKey: firstIssue.message || 'api.contact.invalidData',
          field: firstIssue?.path?.[0],
        },
        { status: 400 },
      );
    }

    const templateId = Number(process.env[templateEnv]);
    if (!Number.isFinite(templateId) || templateId <= 0) {
      return NextResponse.json(
        { ok: false, errorKey: 'api.contact.misconfigured' },
        { status: 500 },
      );
    }

    const result = await send(parsed.data, templateId);

    return NextResponse.json(
      { ok: true, messageId: result?.messageId },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.log(error);
    const status = (error as { status?: number })?.status ?? 500;
    return NextResponse.json(
      { ok: false, errorKey: 'api.contact.unknown' },
      { status },
    );
  }
}
