import { ReactNode } from 'react';

export const LEGAL_LINK = 'text-primary hover:underline underline-offset-4';

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="font-sans font-semibold text-2xl mb-4">{title}</h2>
      {children}
    </section>
  );
}
