interface LegalHeaderProps {
  title: string;
  intro?: string;
}

export function LegalHeader({ title, intro }: LegalHeaderProps) {
  return (
    <div className="border-b pb-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {intro && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
}
