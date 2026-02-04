import Image from 'next/image';

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
  if (!src) {
    return (
      <div className="absolute inset-0 -z-10 bg-muted">
        <div
          className="
    absolute inset-0 -z-10
    bg-animated-gradient
    bg-linear-to-br
    from-background
    via-primary/10
    to-background
  "
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/25 to-black/35" />
    </div>
  );
}
