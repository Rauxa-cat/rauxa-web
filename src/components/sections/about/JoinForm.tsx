'use client';

import { useId } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { m } from 'motion/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  Honeypot,
  PrivacyConsent,
  SubmitButton,
} from '@/components/forms/FormFields';
import { staggerContainer } from '@/components/motion/Stagger';
import { useContactSubmit } from '@/hooks/useContactSubmit';
import { JOIN_INTENTS } from '@/lib/content/join';
import { joinSchema } from '@/lib/validation/join.schema';

type JoinFormValues = z.infer<typeof joinSchema>;

const TEXT_FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name' },
  { name: 'email', type: 'email', autoComplete: 'email' },
  { name: 'phone', type: 'tel', autoComplete: 'tel' },
] as const;

const LABEL =
  'font-accent block text-lg tracking-[0.18em] text-foreground/60 uppercase';

// Same reason as the contact form: re-running the entrance mid-typing would
// move the fields under the cursor.
const VIEWPORT = { once: true, amount: 0.15 } as const;

export function JoinForm() {
  const t = useTranslations('contact.form');
  const tJoin = useTranslations('about.join');
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      company: '',
      acceptPrivacy: false,
    },
    mode: 'onBlur',
  });

  const { submit } = useContactSubmit(setError, { endpoint: '/api/join' });
  const acceptPrivacy = useWatch({ control, name: 'acceptPrivacy' });

  const errorText = (msg?: string) =>
    msg ? t(msg as Parameters<typeof t>[0]) : undefined;

  const onSubmit: SubmitHandler<JoinFormValues> = async (values) => {
    const result = await submit(values);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.success(t('api.contact.success'));
    reset();
  };

  const intentError = errorText(errors.intent?.message);
  const messageError = errorText(errors.message?.message);

  return (
    <m.form
      // Without scripts the browser submits natively: POST keeps the visitor's
      // details out of the URL, history and server logs.
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      variants={staggerContainer(0.1, 0.12)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <Honeypot {...register('company')} />

      <m.div
        className="grid gap-6 sm:grid-cols-2"
        variants={staggerContainer(0, 0.06)}
      >
        {TEXT_FIELDS.map((f) => {
          const id = fieldId(f.name);
          const error = errorText(errors[f.name]?.message);
          return (
            <FormField key={f.name} id={id} error={error}>
              <label htmlFor={id} className={LABEL}>
                {tJoin(`labels.${f.name}`)}
              </label>
              <Input
                id={id}
                type={f.type}
                autoComplete={f.autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className="h-13 rounded-none"
                {...register(f.name)}
              />
            </FormField>
          );
        })}
      </m.div>

      <FormField id={fieldId('intent')} error={intentError}>
        <fieldset
          // `group`, the implicit role, does not take aria-invalid; radiogroup does.
          role="radiogroup"
          aria-invalid={intentError ? true : undefined}
          aria-describedby={
            intentError ? `${fieldId('intent')}-error` : undefined
          }
          className="space-y-3.5"
        >
          <legend className={LABEL}>{tJoin('labels.intent')}</legend>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {JOIN_INTENTS.map((intent) => (
              <label
                key={intent}
                className="flex min-h-14 cursor-pointer items-center gap-3 border border-foreground/25 px-4.5 text-foreground/85 transition-colors has-checked:border-primary has-checked:bg-primary/12 has-checked:text-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring hover:border-foreground/50"
              >
                <input
                  type="radio"
                  value={intent}
                  className="size-4.5 shrink-0 accent-primary"
                  {...register('intent')}
                />
                {tJoin(`options.${intent}`)}
              </label>
            ))}
          </div>
        </fieldset>
      </FormField>

      <FormField id={fieldId('message')} error={messageError}>
        <label htmlFor={fieldId('message')} className={LABEL}>
          {tJoin('labels.message')}
        </label>
        <Textarea
          id={fieldId('message')}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={
            messageError ? `${fieldId('message')}-error` : undefined
          }
          className="min-h-36 rounded-none"
          {...register('message')}
        />
      </FormField>

      <PrivacyConsent
        id={fieldId('acceptPrivacy')}
        checked={acceptPrivacy}
        error={errorText(errors.acceptPrivacy?.message)}
        onCheckedChange={(checked) =>
          setValue('acceptPrivacy', checked, { shouldValidate: true })
        }
      />

      <SubmitButton pending={isSubmitting} />
    </m.form>
  );
}
