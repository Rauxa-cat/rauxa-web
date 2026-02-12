'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { contactSchema } from '@/lib/validation/contact.schema';
import {
  useContactSubmit,
  type ContactFormValues,
} from '@/hooks/useContactSubmit';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact.form');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      company: '',
    },
    mode: 'onBlur',
  });

  const { submit } = useContactSubmit(setError);

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    const result = await submit(values);
    if (result.ok) reset();
  };

  return (
    <div className="rounded-3xl border bg-card p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register('company')}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Field error={errors.name?.message}>
            <Input placeholder={t('placeholders.name')} {...register('name')} />
          </Field>

          <Field error={errors.email?.message}>
            <Input
              placeholder={t('placeholders.email')}
              type="email"
              {...register('email')}
            />
          </Field>

          <Field error={errors.phone?.message}>
            <Input
              placeholder={t('placeholders.phone')}
              {...register('phone')}
            />
          </Field>

          <Field error={errors.subject?.message}>
            <Input
              placeholder={t('placeholders.subject')}
              {...register('subject')}
            />
          </Field>
        </div>

        <Field error={errors.message?.message}>
          <Textarea
            placeholder={t('placeholders.message')}
            className="min-h-40"
            {...register('message')}
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            t('buttons.sending')
          ) : (
            <>
              {t('buttons.send')} <span className="ml-2">→</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function Field({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
