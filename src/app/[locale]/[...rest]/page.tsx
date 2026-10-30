import { notFound } from 'next/navigation';

// Without it an unknown path under a locale falls through to the root
// not-found, outside the locale layout, and loses the header and footer.
export default function CatchAll() {
  notFound();
}
