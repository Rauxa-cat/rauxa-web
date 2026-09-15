const HOLD = 'data-hero-hold';
const STALL_MS = 4000;

// An expando and not an attribute: the script marks the photo before React
// hydrates, and an attribute the server never rendered is a hydration mismatch.
type HeroPhoto = HTMLImageElement & { heroHeld?: boolean };

// Two paths for one hold, one per entry into a hero page; see "The hero hold"
// in CLAUDE.md before touching either. `decode()` and not `load`, which only
// means the bytes arrived: decoding a full-bleed photo is a real cost on a
// mid-range phone, and it is paid after `load` fires.

// The stall timer is armed inside the handler, not here: measured from parse it
// would spend its budget on the document and have none left for the photo.
export const HERO_HOLD_SCRIPT = `(function(){var d=document.documentElement,t,i;d.setAttribute('${HOLD}','');var r=function(){clearTimeout(t);d.removeAttribute('${HOLD}');if(i)i.heroHeld=true};document.addEventListener('DOMContentLoaded',function(){i=document.querySelector('img[data-hero-photo]');if(!i||!i.decode)return r();t=setTimeout(r,${STALL_MS});i.decode().then(r,r)})})()`;

export function holdUntilDecoded(onRelease: () => void) {
  const root = document.documentElement;
  const photo = document.querySelector<HeroPhoto>('img[data-hero-photo]');
  if (!photo || photo.heroHeld) {
    onRelease();
    return;
  }

  // `decode()` cannot be cancelled, so a navigation away leaves one in flight
  // that would resolve into the next page and lift a hold it knows nothing
  // about. The flag is what scopes this release to this mount.
  let done = false;
  const release = () => {
    if (done) return;
    done = true;
    clearTimeout(stall);
    root.removeAttribute(HOLD);
    photo.heroHeld = true;
    onRelease();
  };

  root.setAttribute(HOLD, '');
  const stall = setTimeout(release, STALL_MS);
  photo.decode().then(release, release);

  return () => {
    done = true;
    clearTimeout(stall);
    root.removeAttribute(HOLD);
  };
}
