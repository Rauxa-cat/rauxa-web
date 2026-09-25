import { Details, DetailsBody } from '@/components/motion/Details';
import { RevealItem } from '@/components/motion/Reveal';
import { RowIndex } from '../shared/RowIndex';
import { DetailsCloseButton } from './DetailsCloseButton';

type ProjectRowProps = {
  position: number;
  name: string;
  meta: string;
  summary: string;
  detail: string;
  lessLabel: string;
};

export function ProjectRow({
  position,
  name,
  meta,
  summary,
  detail,
  lessLabel,
}: ProjectRowProps) {
  return (
    <RevealItem className="border-b border-foreground/12">
      <Details className="-mx-5 px-5 transition-[background-color,box-shadow] duration-500 open:bg-primary/7 open:shadow-[inset_2px_0_0_var(--color-primary)]">
        <summary className="group/row grid cursor-pointer list-none grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 py-5.5 md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:gap-x-6 [&::-webkit-details-marker]:hidden">
          <RowIndex className="text-xl">
            {String(position + 1).padStart(2, '0')}
          </RowIndex>
          <h3 className="font-normal text-[clamp(1.75rem,3vw,2.25rem)]/[1.1] transition-colors duration-300 group-hover/row:text-primary">
            {name}
          </h3>
          <span className="font-accent col-start-2 text-lg tracking-[0.12em] text-foreground/60 uppercase md:col-start-auto md:text-right">
            {meta}
          </span>
        </summary>

        <DetailsBody className="ml-14 flex flex-col items-start gap-4 pb-7 md:ml-24">
          <p className="max-w-195 text-base leading-[1.75] text-foreground/82">
            {summary}
          </p>
          <p className="max-w-195 text-[0.9375rem] leading-[1.8] text-foreground/62">
            {detail}
          </p>
          <DetailsCloseButton className="font-accent mt-1 cursor-pointer text-[1.1875rem] tracking-[0.2em] text-blue-ink uppercase transition-colors hover:text-blue-ink-hover">
            {lessLabel} <span aria-hidden="true">∧</span>
          </DetailsCloseButton>
        </DetailsBody>
      </Details>
    </RevealItem>
  );
}
