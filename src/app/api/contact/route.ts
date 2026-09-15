import { sendTemplateEmailBrevo } from '@/lib/mail/sendTemplateEmailBrevo';
import { contactSchema } from '@/lib/validation/contact.schema';
import { handleFormPost } from '@/lib/http/handleFormPost';

export function POST(req: Request) {
  return handleFormPost(req, {
    schema: contactSchema,
    templateEnv: 'BREVO_CONTACT_TEMPLATE_ID',
    send: ({ name, email, phone, subject, message }, templateId) =>
      sendTemplateEmailBrevo({
        templateId,
        tag: 'contact-form',
        replyTo: { email, name },
        params: { name, email, phone: phone || '-', subject, message },
      }),
  });
}
