import { HeroAperture } from './HeroAperture';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
}

export function HeroBackground({ src, alt = '' }: HeroBackgroundProps) {
  if (!src) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={!alt}>
      <HeroAperture src={src} alt={alt} />
    </div>
  );
}
