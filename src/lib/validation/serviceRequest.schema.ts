import { z } from 'zod';
import { SERVICE_IDS } from '@/lib/content/services';
import { contactSchema } from './contact.schema';

export const serviceRequestSchema = contactSchema
  .omit({ subject: true })
  .extend({
    service: z.enum(SERVICE_IDS, { message: 'errors.service.required' }),
  });
