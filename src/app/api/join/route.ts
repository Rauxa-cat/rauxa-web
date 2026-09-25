import { getTranslations } from 'next-intl/server';
import { sendTemplateEmailBrevo } from '@/lib/mail/sendTemplateEmailBrevo';
import { joinSchema } from '@/lib/validation/join.schema';
import { handleFormPost } from '@/lib/http/handleFormPost';

export function POST(req: Request) {
  return handleFormPost(req, {
    schema: joinSchema,
    templateEnv: 'BREVO_JOIN_TEMPLATE_ID',
    send: async ({ name, email, phone, intent, message }, templateId) => {
      // The inbox is read in Spanish, whichever locale the request came from.
      const t = await getTranslations({
        locale: 'es',
        namespace: 'about.join.options',
      });

      return sendTemplateEmailBrevo({
        templateId,
        tag: 'join',
        replyTo: { email, name },
        params: {
          name,
          email,
          phone: phone || '-',
          intent: t(intent),
          message,
        },
      });
    },
  });
}
