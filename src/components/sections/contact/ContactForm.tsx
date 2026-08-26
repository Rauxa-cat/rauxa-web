'use client';

import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@/i18n/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

import { contactSchema } from '@/lib/validation/contact.schema';
import {
  useContactSubmit,
  type ContactFormValues,
} from '@/hooks/useContactSubmit';
import { useTranslations } from 'next-intl';

const SHORT_FIELDS = [
  { name: 'name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'subject', type: 'text' },
] as const;

export function ContactForm() {
  const t = useTranslations('contact.form');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    setValue,
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
      acceptPrivacy: false,
    },
    mode: 'onBlur',
  });

  const errorText = (msg?: string) =>
    msg ? t(msg as Parameters<typeof t>[0]) : undefined;

  const { submit } = useContactSubmit(setError);

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    const result = await submit(values);
    if (result.ok) reset();
  };

  const acceptPrivacy = useWatch({ control, name: 'acceptPrivacy' });

  return (
    <div className="rounded-[22px] border border-foreground/15 bg-foreground/3 p-6 md:p-9">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register('company')}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {SHORT_FIELDS.map((f) => {
            const label = t(`placeholders.${f.name}`);
            const error = errorText(errors[f.name]?.message);
            return (
              <Field key={f.name} id={f.name} error={error}>
                <Input
                  id={f.name}
                  type={f.type}
                  placeholder={label}
                  aria-label={label}
                  aria-invalid={errors[f.name] ? true : undefined}
                  aria-describedby={error ? `${f.name}-error` : undefined}
                  className="h-11"
                  {...register(f.name)}
                />
              </Field>
            );
          })}
        </div>

        <Field id="message" error={errorText(errors.message?.message)}>
          <Textarea
            id="message"
            placeholder={t('placeholders.message')}
            aria-label={t('placeholders.message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="min-h-52"
            {...register('message')}
          />
        </Field>

        <Field
          id="acceptPrivacy"
          error={errorText(errors.acceptPrivacy?.message)}
        >
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="acceptPrivacy"
              checked={acceptPrivacy}
              aria-describedby={
                errors.acceptPrivacy ? 'acceptPrivacy-error' : undefined
              }
              onCheckedChange={(checked) =>
                setValue('acceptPrivacy', checked === true)
              }
            />
            <label
              htmlFor="acceptPrivacy"
              className="cursor-pointer text-sm leading-relaxed"
            >
              {t('privacy.accept')}{' '}
              <Link
                href="/privacy"
                className="text-blue-ink underline underline-offset-4 hover:opacity-80"
                target="_blank"
              >
                {t('privacy.link')}
              </Link>
            </label>
          </div>
        </Field>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-14.5 w-full rounded-none tracking-[0.14em] shadow-[0_20px_50px_-18px_rgba(0,76,255,0.9)] motion-reduce:transition-none"
        >
          {isSubmitting ? (
            t('buttons.sending')
          ) : (
            <>
              {t('buttons.send')} <ArrowIcon className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function Field({
  id,
  children,
  error,
}: {
  id: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
