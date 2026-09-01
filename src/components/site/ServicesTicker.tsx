import { getTranslations } from 'next-intl/server';
import { SERVICES } from '@/lib/content/services';

function Sequence({ labels, hidden }: { labels: string[]; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden} className="flex shrink-0 items-center">
      {labels.map((label, i) => (
        <span key={i} className="flex items-center gap-11 pl-11">
          {label}
          <span aria-hidden="true" className="text-[0.6em]">
            ◆
          </span>
        </span>
      ))}
    </span>
  );
}

export async function ServicesTicker() {
  const t = await getTranslations('services.items');
  const labels = SERVICES.map((s) => t(`${s.id}.title`));

  return (
    /* `contain-intrinsic-size` has to keep matching `h-18`, or the skipped
       marquee reserves the wrong height and the page jumps. */
    <div className="relative flex h-18 items-center overflow-hidden bg-[var(--rauxa-electric)] [contain-intrinsic-size:auto_4.5rem] [content-visibility:auto]">
      <div className="font-accent flex shrink-0 items-center text-[28px] tracking-[0.2em] whitespace-nowrap text-[var(--rauxa-black)] uppercase [animation:marquee_30s_linear_infinite] motion-reduce:[animation:none]">
        <Sequence labels={labels} />
        <Sequence labels={labels} hidden />
      </div>
    </div>
  );
}
