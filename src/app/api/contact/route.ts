import { NextResponse } from 'next/server';
import { sendContactEmailBrevo } from '@/lib/mail/sendContactEmailBrevo';
import { contactSchema } from '@/lib/validation/contact.schema';
import { getClientIp } from '@/lib/http/getClientIp';
import { limitContactByIp } from '@/lib/security/ratelimit';

export async function POST(req: Request) {
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
    const parsed = contactSchema.safeParse(body);

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

    const { name, email, phone, subject, message } = parsed.data;
    const templateId = Number(process.env.BREVO_CONTACT_TEMPLATE_ID);
    if (!Number.isFinite(templateId) || templateId <= 0) {
      return NextResponse.json(
        { ok: false, errorKey: 'api.contact.misconfigured' },
        { status: 500 },
      );
    }

    const result = await sendContactEmailBrevo({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      templateId,
    });

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
