export function getClientIp(req: Request) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return '127.0.0.1';
}
