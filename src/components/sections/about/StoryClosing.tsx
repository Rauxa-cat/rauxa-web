import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { CtaBackdrop } from '../shared/CtaBackdrop';
import { BackdropVideo } from './BackdropVideo';

export type StoryMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string };

// Until the client's photo or video arrives, the closing stands on the brand
// backdrop the contact band uses, so it never ships as an empty frame.
export async function StoryClosing({ media }: { media?: StoryMedia }) {
  const t = await getTranslations('about.closing');

  return (
    <section
      className={cn(
        'relative mt-24 flex min-h-[90svh] items-center overflow-hidden md:mt-32',
        media ? 'bg-[var(--rauxa-black)]' : 'bg-rauxa-blue-900',
      )}
    >
      {media ? (
        <>
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <BackdropVideo src={media.src} poster={media.poster} />
          )}
          <div
            className="absolute inset-0 [background:linear-gradient(180deg,rgb(10_10_13/0.55)_0%,rgb(10_10_13/0.78)_60%,rgb(10_10_13/0.95)_100%)]"
            aria-hidden
          />
        </>
      ) : (
        <CtaBackdrop />
      )}

      <div className="relative mx-auto w-full max-w-page px-6 py-24">
        <h2 className="font-brand text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.98] font-normal">
          <MaskReveal className="text-white">{t('line1')}</MaskReveal>
          {/* Black by choice, as on the contact band. It only reaches 3.27:1
              at the electric stop and drops to 1.1:1 over blue-900; blue-100
              passes everywhere and was tried and turned down for the look.
              Over a photo the line takes the electric glow instead. */}
          <MaskReveal
            delay={0.15}
            className={cn(
              'mt-[0.12em]',
              media
                ? 'text-primary [text-shadow:0_0_80px_--alpha(var(--color-primary)/55%)]'
                : 'text-[var(--rauxa-black)]',
            )}
          >
            {t('line2')}
          </MaskReveal>
        </h2>
      </div>
    </section>
  );
}
