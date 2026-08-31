const ATTR = 'data-hero-hold';
const STALL_MS = 4000;

// Two paths for one hold, one per entry into a hero page; see "The hero hold"
// in CLAUDE.md before touching either. `decode()` and not `load`, which only
// means the bytes arrived: decoding a full-bleed photo is a real cost on a
// mid-range phone, and it is paid after `load` fires.

// Runs from `<body>`, so the hero image is not parsed yet: the hold goes on
// immediately and only the release waits for the document.
export const HERO_HOLD_SCRIPT = `(function(){var d=document.documentElement,t;d.setAttribute('${ATTR}','');var r=function(){clearTimeout(t);d.removeAttribute('${ATTR}')};t=setTimeout(r,${STALL_MS});document.addEventListener('DOMContentLoaded',function(){var i=document.querySelector('img[data-hero-photo]');if(!i||!i.decode)return r();i.decode().then(r,r)})})()`;

export function holdUntilDecoded() {
  const root = document.documentElement;
  const photo = document.querySelector<HTMLImageElement>(
    'img[data-hero-photo]',
  );
  if (!photo || photo.complete) return;

  root.setAttribute(ATTR, '');
  const release = () => root.removeAttribute(ATTR);
  const stall = setTimeout(release, STALL_MS);
  photo.decode().then(release, release);

  return () => {
    clearTimeout(stall);
    release();
  };
}
