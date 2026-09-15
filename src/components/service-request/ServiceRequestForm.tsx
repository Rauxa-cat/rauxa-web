'use client';

import { useId, useState } from 'react';
import { m } from 'motion/react';
import {
  useWatch,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import type { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  Honeypot,
  PrivacyConsent,
  SubmitButton,
} from '@/components/forms/FormFields';
import { StaggerItem, staggerContainer } from '@/components/motion/Stagger';
import { useContactSubmit } from '@/hooks/useContactSubmit';
import { SERVICE_IDS } from '@/lib/content/services';
import type { serviceRequestSchema } from '@/lib/validation/serviceRequest.schema';

export type ServiceRequestValues = z.infer<typeof serviceRequestSchema>;

const TEXT_FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name' },
  { name: 'email', type: 'email', autoComplete: 'email' },
  { name: 'phone', type: 'tel', autoComplete: 'tel' },
] as const;

export function ServiceRequestForm({
  form,
  onSent,
}: {
  form: UseFormReturn<ServiceRequestValues>;
  onSent: () => void;
}) {
  const t = useTranslations('contact.form');
  const tRequest = useTranslations('serviceRequest');
  const tItems = useTranslations('services.items');
  const uid = useId();
  const [serverError, setServerError] = useState<string>();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const { submit } = useContactSubmit(setError, {
    endpoint: '/api/service-request',
  });
  const acceptPrivacy = useWatch({ control, name: 'acceptPrivacy' });

  const errorText = (msg?: string) =>
    msg ? t(msg as Parameters<typeof t>[0]) : undefined;
  const fieldId = (name: string) => `${uid}-${name}`;

  const onSubmit: SubmitHandler<ServiceRequestValues> = async (values) => {
    setServerError(undefined);
    const result = await submit(values);
    if (result.ok) onSent();
    else if (!result.field) setServerError(result.message);
  };

  const serviceError = errorText(errors.service?.message);

  return (
    <m.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-8 space-y-4"
      variants={staggerContainer(0, 0.05)}
    >
      <Honeypot {...register('company')} />

      <m.div
        className="grid gap-4 sm:grid-cols-2"
        variants={staggerContainer(0, 0.05)}
      >
        {TEXT_FIELDS.map((f) => {
          const id = fieldId(f.name);
          const label = t(`placeholders.${f.name}`);
          const error = errorText(errors[f.name]?.message);
          return (
            <FormField key={f.name} id={id} error={error}>
              <Input
                id={id}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={label}
                aria-label={label}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className="h-11"
                {...register(f.name)}
              />
            </FormField>
          );
        })}

        <FormField id={fieldId('service')} error={serviceError}>
          <div className="relative">
            <select
              id={fieldId('service')}
              aria-label={tRequest('service')}
              aria-invalid={serviceError ? true : undefined}
              aria-describedby={
                serviceError ? `${fieldId('service')}-error` : undefined
              }
              className="h-11 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent pr-10 pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm dark:bg-input/30 [&>option]:bg-background"
              {...register('service')}
            >
              {SERVICE_IDS.map((id) => (
                <option key={id} value={id}>
                  {tItems(`${id}.title`)}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </FormField>
      </m.div>

      <FormField
        id={fieldId('message')}
        error={errorText(errors.message?.message)}
      >
        <Textarea
          id={fieldId('message')}
          placeholder={tRequest('message')}
          aria-label={tRequest('message')}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? `${fieldId('message')}-error` : undefined
          }
          className="min-h-36"
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

      {serverError && (
        <StaggerItem>
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        </StaggerItem>
      )}

      <SubmitButton pending={isSubmitting} />
    </m.form>
  );
}
