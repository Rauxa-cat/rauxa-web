import Image from 'next/image';
import { cn } from '@/lib/utils';
import { RowIndex } from '../shared/RowIndex';

type TeamMemberProps = {
  index: string;
  name: string;
  bio: string;
  image: string;
  reversed?: boolean;
};

export function TeamMember({
  index,
  name,
  bio,
  image,
  reversed = false,
}: TeamMemberProps) {
  return (
    <li className="border-b border-foreground/15">
      <div
        className={cn(
          'mx-auto flex max-w-page flex-col gap-10 px-6 py-20 md:items-start md:gap-20 md:py-24',
          reversed ? 'md:flex-row-reverse' : 'md:flex-row',
        )}
      >
        <div className="relative aspect-23/29 w-full shrink-0 overflow-hidden md:w-115">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 460px, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,76,255,0.16)_0%,rgba(10,10,13,0.42)_100%)]"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col items-start gap-6 md:pt-3">
          <RowIndex className="text-2xl">{index}</RowIndex>
          <h3 className="font-normal leading-[1.02] text-foreground text-[clamp(2.5rem,6vw,4.5rem)]">
            {name}
          </h3>
          <span className="h-px w-15 bg-primary" aria-hidden />
          <p className="max-w-160 text-base leading-[1.75] text-foreground/70">
            {bio}
          </p>
        </div>
      </div>
    </li>
  );
}
