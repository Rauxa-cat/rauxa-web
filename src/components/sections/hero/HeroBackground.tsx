import Image from 'next/image';
import { HeroGlow } from './HeroGlow';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
  priority?: boolean;
}

// Blue wash + lateral darkening so the blue band never crosses the photo (contrast, not style).
const blueVeil =
  'bg-[linear-gradient(178deg,rgba(0,76,255,0.30)_0%,rgba(0,24,90,0.28)_52%,rgba(10,10,13,0.72)_100%)]';
const sideVeil =
  'bg-[linear-gradient(90deg,rgba(10,10,13,0.96)_0%,rgba(10,10,13,0.72)_26%,rgba(10,10,13,0)_58%)]';

export function HeroBackground({
  src,
  alt = '',
  priority = true,
}: HeroBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={!alt}>
      {src && (
        <>
          {/* Desktop: corner slab aligned to the page container's right edge. */}
          <div className="absolute inset-0 mx-auto hidden max-w-page lg:block">
            <div className="absolute top-0 right-0 h-[52%] w-[44%] max-h-[480px] max-w-[620px] overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                className="object-cover object-[54%_36%]"
                sizes="44vw"
              />
              <div className={`absolute inset-0 ${blueVeil}`} />
              <div className={`absolute inset-0 ${sideVeil}`} />
            </div>
          </div>

          {/* Mobile: full-bleed photo behind the text. */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="object-cover object-[54%_36%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--rauxa-black)]/75" />
          </div>
        </>
      )}

      {/* Blue glow behind the punch band; its opacity is scroll-linked (see HeroGlow). */}
      <HeroGlow />
    </div>
  );
}
