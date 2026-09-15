'use client';

import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { z } from 'zod';
import { contactSchema } from '@/lib/validation/contact.schema';
import { useTranslations } from 'next-intl';

export type ContactFormValues = z.infer<typeof contactSchema>;

type ApiError = { ok: false; errorKey: string; field?: string };
type ApiOk = { ok: true; messageId?: string };

type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; field?: string };

function isApiError(v: unknown): v is ApiError {
  if (typeof v !== 'object' || v === null) return false;
  const record = v as Record<string, unknown>;
  return record.ok === false && typeof record.errorKey === 'string';
}

// Reports the outcome instead of toasting it: inside a modal dialog everything
// outside the panel, the toaster included, is hidden from assistive tech.
export function useContactSubmit<T extends FieldValues = ContactFormValues>(
  setError: UseFormSetError<T>,
  { endpoint = '/api/contact' }: { endpoint?: string } = {},
) {
  const t = useTranslations('contact.form');

  const translateKey = (key: string) => t(key as Parameters<typeof t>[0]);
  const failure = (key: string, field?: string): SubmitResult => ({
    ok: false,
    message: translateKey(key),
    field,
  });

  const submit = async (values: T): Promise<SubmitResult> => {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (!isApiError(data)) return failure('api.contact.unknown');

        if (res.status === 400 && data.field) {
          setError(data.field as Path<T>, {
            type: 'server',
            message: data.errorKey,
          });
        }

        return failure(data.errorKey, data.field);
      }

      const ok = data as Partial<ApiOk>;
      if (!ok.ok) return failure('api.contact.unknown');

      return { ok: true };
    } catch {
      return failure('api.contact.unknown');
    }
  };

  return { submit };
}
