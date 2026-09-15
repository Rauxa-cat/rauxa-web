'use client';

import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { m } from 'motion/react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  Honeypot,
  PrivacyConsent,
  SubmitButton,
} from '@/components/forms/FormFields';
import { staggerContainer } from '@/components/motion/Stagger';
import { EASE, NOJS } from '@/lib/motion';

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

// `once` matters here: re-running the entrance while someone is typing would
// yank focus around, so the card animates in exactly one time.
const VIEWPORT = { once: true, amount: 0.15 } as const;

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
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.success(t('api.contact.success'));
    reset();
  };

  const acceptPrivacy = useWatch({ control, name: 'acceptPrivacy' });

  return (
    <m.div
      {...NOJS.reset}
      className="rounded-[22px] border border-foreground/15 bg-foreground/3 p-6 md:p-9"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* The gap here outlasts the grid's own internal cascade below, so the
          form still reveals strictly top-down rather than overlapping rows. */}
      <m.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
        variants={staggerContainer(0.25, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <Honeypot {...register('company')} />

        <m.div
          className="grid gap-5 md:grid-cols-2"
          variants={staggerContainer(0, 0.06)}
        >
          {SHORT_FIELDS.map((f) => {
            const label = t(`placeholders.${f.name}`);
            const error = errorText(errors[f.name]?.message);
            return (
              <FormField key={f.name} id={f.name} error={error}>
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
              </FormField>
            );
          })}
        </m.div>

        <FormField id="message" error={errorText(errors.message?.message)}>
          <Textarea
            id="message"
            placeholder={t('placeholders.message')}
            aria-label={t('placeholders.message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="min-h-52"
            {...register('message')}
          />
        </FormField>

        <PrivacyConsent
          id="acceptPrivacy"
          checked={acceptPrivacy}
          error={errorText(errors.acceptPrivacy?.message)}
          onCheckedChange={(checked) =>
            setValue('acceptPrivacy', checked, { shouldValidate: true })
          }
        />

        <SubmitButton pending={isSubmitting} />
      </m.form>
    </m.div>
  );
}
