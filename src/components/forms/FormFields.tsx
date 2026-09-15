'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { StaggerItem } from '@/components/motion/Stagger';
import { cn } from '@/lib/utils';

export function FormField({
  id,
  children,
  error,
  className,
}: {
  id: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <StaggerItem className={cn('space-y-1.5', className)}>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </StaggerItem>
  );
}

export function Honeypot(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
      aria-hidden="true"
    />
  );
}

export function PrivacyConsent({
  id,
  checked,
  onCheckedChange,
  error,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}) {
  const t = useTranslations('contact.form.privacy');

  return (
    <FormField id={id} error={error}>
      <div className="flex items-center gap-2.5">
        <Checkbox
          id={id}
          checked={checked}
          aria-describedby={error ? `${id}-error` : undefined}
          onCheckedChange={(value) => onCheckedChange(value === true)}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed">
          {t('accept')}{' '}
          <Link
            href="/privacy"
            className="text-blue-ink underline underline-offset-4 hover:opacity-80"
            target="_blank"
          >
            {t('link')}
          </Link>
        </label>
      </div>
    </FormField>
  );
}

export function SubmitButton({ pending }: { pending: boolean }) {
  const t = useTranslations('contact.form.buttons');

  return (
    <StaggerItem>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="group h-14.5 w-full rounded-none tracking-[0.14em] shadow-[0_20px_50px_-18px_--alpha(var(--color-primary)/90%)] motion-reduce:transition-none"
      >
        {pending ? (
          t('sending')
        ) : (
          <>
            {t('send')} <ArrowIcon animate className="ml-2" />
          </>
        )}
      </Button>
    </StaggerItem>
  );
}
