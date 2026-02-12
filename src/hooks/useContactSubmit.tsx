'use client';

import { toast } from 'sonner';
import type { UseFormSetError } from 'react-hook-form';
import type { z } from 'zod';
import { contactSchema } from '@/lib/validation/contact.schema';
import { useTranslations } from 'next-intl';

export type ContactFormValues = z.infer<typeof contactSchema>;

type ApiError = { ok: false; errorKey: string; field?: string };
type ApiOk = { ok: true; messageId?: string };

function isApiError(v: unknown): v is ApiError {
  if (typeof v !== 'object' || v === null) return false;
  const record = v as Record<string, unknown>;
  return record.ok === false && typeof record.errorKey === 'string';
}

export function useContactSubmit(setError: UseFormSetError<ContactFormValues>) {
  const t = useTranslations('contact.form');

  const translateKey = (key?: string) => {
    if (!key) return undefined;
    return t(key as Parameters<typeof t>[0]);
  };

  const submit = async (values: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorKey = isApiError(data)
          ? data.errorKey
          : 'api.contact.unknown';

        if (res.status === 400 && isApiError(data) && data.field) {
          setError(data.field as keyof ContactFormValues, {
            type: 'server',
            message: data.errorKey,
          });
        }

        toast.error(
          translateKey(errorKey) ?? translateKey('api.contact.unknown'),
        );
        return { ok: false as const };
      }

      const ok = data as Partial<ApiOk>;
      if (!ok.ok) {
        toast.error(translateKey('api.contact.unknown'));
        return { ok: false as const };
      }

      toast.success(translateKey('api.contact.success'));
      return { ok: true as const };
    } catch {
      toast.error(translateKey('api.contact.unknown'));
      return { ok: false as const };
    }
  };

  return { submit };
}
