import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nombre demasiado corto')
    .max(100, 'Nombre demasiado largo'),

  email: z.string().trim().toLowerCase().email('Email inválido'),

  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[+]?[\d\s()-]{7,20}$/.test(v), 'Teléfono inválido'),

  subject: z
    .string()
    .trim()
    .max(150, 'Asunto demasiado largo')
    .transform((v) => (v && v.length > 0 ? v : 'Contacto web')),

  message: z
    .string()
    .trim()
    .min(10, 'Mensaje demasiado corto')
    .max(5000, 'Mensaje demasiado largo'),

  // honeypot
  company: z.string().max(0).optional(),
});
