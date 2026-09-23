import { z } from 'zod';
import { JOIN_INTENTS } from '@/lib/content/join';
import { contactSchema } from './contact.schema';

export const joinSchema = contactSchema.omit({ subject: true }).extend({
  intent: z.enum(JOIN_INTENTS, { message: 'errors.intent.required' }),
});
