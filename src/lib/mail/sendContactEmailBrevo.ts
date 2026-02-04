import { AxiosError } from 'axios';
import { brevoClient } from './brevoClient';

type ErrorWithStatus = Error & { status?: number };

export async function sendContactEmailBrevo({
  name,
  email,
  phone,
  subject,
  message,
  templateId,
}: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  templateId: number;
}) {
  try {
    const response = await brevoClient.post('/smtp/email', {
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME || 'RAUXA web',
      },
      to: [{ email: process.env.CONTACT_TO_EMAIL! }],
      replyTo: {
        email,
        name,
      },
      templateId,
      params: {
        name,
        email,
        phone: phone || '-',
        subject: subject || 'Contacto web',
        message,
      },
      tags: ['contact-form'],
    });

    return response.data;
  } catch (error: unknown) {
    let message = 'Brevo email error';
    let status = 500;

    if (
      typeof error === 'object' &&
      error !== null &&
      (error as AxiosError).isAxiosError
    ) {
      const axiosError = error as AxiosError<{ message?: string }>;
      status = axiosError.response?.status ?? 500;
      message =
        axiosError.response?.data?.message || axiosError.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const err: ErrorWithStatus = new Error(message);
    err.status = status;

    throw err;
  }
}
