import { HeroAperture } from './HeroAperture';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
  priority?: boolean;
}

export function HeroBackground({
  src,
  alt = '',
  priority = true,
}: HeroBackgroundProps) {
  if (!src) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={!alt}>
      <HeroAperture src={src} alt={alt} priority={priority} />
    </div>
  );
}
