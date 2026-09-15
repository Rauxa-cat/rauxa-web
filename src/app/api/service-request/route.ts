import { getTranslations } from 'next-intl/server';
import { sendTemplateEmailBrevo } from '@/lib/mail/sendTemplateEmailBrevo';
import { serviceRequestSchema } from '@/lib/validation/serviceRequest.schema';
import { handleFormPost } from '@/lib/http/handleFormPost';

export function POST(req: Request) {
  return handleFormPost(req, {
    schema: serviceRequestSchema,
    templateEnv: 'BREVO_SERVICE_TEMPLATE_ID',
    send: async ({ name, email, phone, service, message }, templateId) => {
      // The inbox is read in Spanish, whichever locale the request came from.
      const t = await getTranslations({
        locale: 'es',
        namespace: 'services.items',
      });

      return sendTemplateEmailBrevo({
        templateId,
        tag: 'service-request',
        replyTo: { email, name },
        params: {
          name,
          email,
          phone: phone || '-',
          service: t(`${service}.title`),
          message,
        },
      });
    },
  });
}
