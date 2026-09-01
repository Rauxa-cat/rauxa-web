import Image from 'next/image';
import { ParallaxLayer } from '@/components/motion/Parallax';

interface HeroApertureProps {
  src: string;
  alt?: string;
  priority?: boolean;
}

export function HeroAperture({
  src,
  alt = '',
  priority = true,
}: HeroApertureProps) {
  return (
    <div
      data-hero-open
      className="absolute inset-0 overflow-hidden [clip-path:inset(0)] [animation:hero-aperture_var(--hero-open)] motion-reduce:[animation:none]"
    >
      {/* Slack on every edge, so neither the scroll drift nor the zoom-out ever
          exposes an empty strip inside the crop. */}
      <ParallaxLayer className="absolute -inset-[6%]" scale={[1, 1.06]}>
        <div
          data-hero-open
          className="relative h-full w-full scale-[1.02] [animation:hero-settle_var(--hero-open)] motion-reduce:[animation:none]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            data-hero-photo=""
            data-hero-open
            className="object-cover object-[54%_38%] [animation:hero-thaw_var(--hero-open)] motion-reduce:[animation:none]"
          />
        </div>
      </ParallaxLayer>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,13,0.62)_0%,rgba(0,20,74,0.30)_42%,rgba(10,10,13,0.86)_100%)]" />
      {/* Narrow screens get a vertical scrim instead: there the copy runs the
          full width, so a lateral gradient leaves the ends of every line on
          bare photo. */}
      <div
        data-hero-open
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,13,0.80)_0%,rgba(10,10,13,0.45)_55%,rgba(10,10,13,0.85)_100%)] [animation:hero-bed_var(--hero-open)] md:bg-[linear-gradient(90deg,rgba(10,10,13,0.94)_0%,rgba(10,10,13,0.68)_34%,rgba(10,10,13,0.20)_62%,rgba(10,10,13,0)_84%)] motion-reduce:[animation:none]"
      />
    </div>
  );
}
