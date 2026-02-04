import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type TeamMemberCardProps = {
  name: string;
  role: string;
  bio?: string;
  image: string;
  className?: string;
};

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
  className,
}: TeamMemberCardProps) {
  return (
    <Card
      className={cn(
        'group rounded-3xl border border-border/60 backdrop-blur',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm',
        className,
      )}
    >
      <div className="relative aspect-3/4 max-h-[350px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-50" />
      </div>

      <CardContent className="space-y-2 p-6">
        {/* Hidden role: awaiting required data  */}
        <p className="hidden font-mono text-xs tracking-[0.35em] text-foreground/60">
          {role.toUpperCase()}
        </p>

        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>

        {bio && <p className="text-sm leading-6 text-foreground/70">{bio}</p>}
      </CardContent>
    </Card>
  );
}
