import { ParallaxLayer } from '@/components/motion/Parallax';

// The blue halo fades and sinks as the hero scrolls away, on the same scene progress
// as the photo and the copy. The text-shadow stays fixed (animating it drops fps).
export function HeroGlow() {
  return (
    <ParallaxLayer
      className="absolute top-[46%] left-[6%] h-[500px] w-[900px] max-w-[85%]"
      opacity={[1, 0.05]}
      y={['0%', '30%']}
      scale={[1, 1.4]}
    >
      <div
        aria-hidden
        className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(0,76,255,0.30)_0%,rgba(0,76,255,0.06)_46%,transparent_72%)]"
      />
    </ParallaxLayer>
  );
}
