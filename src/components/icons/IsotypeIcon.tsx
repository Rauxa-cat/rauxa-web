// Traced from design/isotip.png, in that image's pixel space. The round-joined
// stroke in the fill colour is what rounds the tips of the spikes.
const PATH =
  'M97 220L250 207L176 110L282 178L268 72L316 165L335 55L372 158L425 100L420 165L555 130L455 198L607 158L512 218L638 296L495 268L533 373L420 252L413 322L360 248L376 374L302 262L295 390L252 268L162 358L234 242Z';

export function IsotypeIcon({
  className,
  outline = false,
}: {
  className?: string;
  outline?: boolean;
}) {
  return (
    <svg
      viewBox="88 46 562 354"
      fill={outline ? 'none' : 'currentColor'}
      stroke="currentColor"
      strokeWidth={outline ? 5 : 8}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATH} />
    </svg>
  );
}
