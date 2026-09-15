const SLOGAN = 'Gastronomic orgasm';
/* Each sequence has to outrun the widest viewport, or the loop shows a gap
   before the duplicate slides in. */
const REPEATS = 6;

function Sequence({ hidden }: { hidden?: boolean }) {
  return (
    <span aria-hidden={hidden} className="flex shrink-0 items-center">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center gap-11 pl-11">
          {SLOGAN}
          <span aria-hidden="true" className="text-[0.6em]">
            ◆
          </span>
        </span>
      ))}
    </span>
  );
}

export function ServicesTicker() {
  return (
    /* `contain-intrinsic-size` has to keep matching `h-18`, or the skipped
       marquee reserves the wrong height and the page jumps. */
    <div className="relative flex h-18 items-center overflow-hidden bg-[var(--rauxa-electric)] [contain-intrinsic-size:auto_4.5rem] [content-visibility:auto]">
      <div className="font-accent flex shrink-0 items-center text-[28px] tracking-[0.2em] whitespace-nowrap text-[var(--rauxa-black)] uppercase [animation:marquee_18s_linear_infinite] motion-reduce:[animation:none]">
        <Sequence />
        <Sequence hidden />
      </div>
    </div>
  );
}
