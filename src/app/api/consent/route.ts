import { consentCookie } from '@/lib/consent/consent';

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (
    typeof body !== 'object' ||
    body === null ||
    !('analytics' in body) ||
    typeof body.analytics !== 'boolean'
  ) {
    return new Response(null, { status: 400 });
  }

  const secure = new URL(request.url).protocol === 'https:';
  return new Response(null, {
    status: 204,
    headers: {
      'Set-Cookie': consentCookie({ analytics: body.analytics }, secure),
      'Cache-Control': 'no-store',
    },
  });
}
