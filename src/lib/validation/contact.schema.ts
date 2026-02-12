import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'errors.name.tooShort' })
    .max(100, { message: 'errors.name.tooLong' }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'errors.email.invalid' }),

  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[+]?[\d\s()-]{7,20}$/.test(v), {
      message: 'errors.phone.invalid',
    }),

  subject: z
    .string()
    .trim()
    .max(150, { message: 'errors.subject.tooLong' })
    .transform((v) => (v && v.length > 0 ? v : 'Contacto web')),

  message: z
    .string()
    .trim()
    .min(10, { message: 'errors.message.tooShort' })
    .max(5000, { message: 'errors.message.tooLong' }),

  // honeypot
  company: z.string().max(0).optional(),
});
