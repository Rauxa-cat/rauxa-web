import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ParallaxLayer } from '@/components/motion/Parallax';
import {
  Sequence,
  SequenceFade,
  SequenceMask,
} from '@/components/motion/Sequence';

type StoryPersonProps = {
  name: string;
  bio: string;
  image: string;
  reversed?: boolean;
};

export function StoryPerson({
  name,
  bio,
  image,
  reversed = false,
}: StoryPersonProps) {
  return (
    <div className="border-t border-foreground/15 pt-12 first:border-t-0 first:pt-0 md:pt-16 md:first:pt-0">
      <div
        className={cn(
          'flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16',
          // So the pair reads as one stagger instead of two stacked blocks.
          reversed && 'lg:ml-[15%] lg:flex-row-reverse',
        )}
      >
        <div className="relative aspect-23/29 w-full shrink-0 overflow-hidden md:w-115">
          {/* The bleed is the slack the drift needs, or it exposes an empty edge. */}
          <ParallaxLayer className="absolute -inset-[6%]" y={['-4%', '4%']}>
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 768px) 520px, 112vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div
            className="absolute inset-0 [background:linear-gradient(180deg,--alpha(var(--color-primary)/16%)_0%,rgba(10,10,13,0.42)_100%)]"
            aria-hidden
          />
        </div>

        <Sequence className="flex flex-1 flex-col items-start gap-5 lg:pt-2">
          <h3 className="font-normal leading-[1.02] text-[clamp(2.25rem,5vw,3.5rem)]">
            <SequenceMask>{name}</SequenceMask>
          </h3>
          <SequenceFade
            delay={0.12}
            className="max-w-160 text-base leading-[1.75] text-foreground/70"
          >
            <p>{bio}</p>
          </SequenceFade>
        </Sequence>
      </div>
    </div>
  );
}
