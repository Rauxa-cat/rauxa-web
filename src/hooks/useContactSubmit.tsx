'use client';

import { toast } from 'sonner';
import type { UseFormSetError } from 'react-hook-form';
import type { z } from 'zod';
import { contactSchema } from '@/lib/validation/contact.schema';

export type ContactFormValues = z.infer<typeof contactSchema>;

type ApiError = { ok: false; error: string; field?: string };
type ApiOk = { ok: true; messageId?: string };

function isApiError(v: unknown): v is ApiError {
  if (typeof v !== 'object' || v === null) return false;
  const record = v as Record<string, unknown>;
  return record.ok === false && typeof record.error === 'string';
}

export function useContactSubmit(setError: UseFormSetError<ContactFormValues>) {
  const submit = async (values: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (res.status === 429) {
        const msg = isApiError(data)
          ? data.error
          : 'Demasiadas solicitudes. Inténtalo más tarde.';
        toast.error(msg);
        return { ok: false as const };
      }

      if (res.status === 400 && isApiError(data)) {
        if (data.field) {
          setError(data.field as keyof ContactFormValues, {
            type: 'server',
            message: data.error,
          });
        }
        toast.error(data.error);
        return { ok: false as const };
      }

      if (!res.ok) {
        toast.error('No se pudo enviar el mensaje. Inténtalo más tarde.');
        return { ok: false as const };
      }

      const ok = data as Partial<ApiOk>;
      if (!ok.ok) {
        const msg = isApiError(data)
          ? data.error
          : 'No se pudo enviar el mensaje.';
        toast.error(msg);
        return { ok: false as const };
      }

      toast.success('¡Mensaje enviado correctamente!');
      return { ok: true as const };
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : 'Error enviando el mensaje',
      );
      return { ok: false as const };
    }
  };

  return { submit };
}
