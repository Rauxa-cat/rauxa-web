export const CONTACT = {
  email: 'info@rauxa.cat',
  phoneDisplay: '+34 684 481 333',
  phoneE164: '+34684481333',
  location: 'Barcelona, Catalunya',
  whatsappUrl: 'https://wa.me/34684481333',
  instagramUrl: 'https://instagram.com/rauxa___',
};

export function buildMailto(params: {
  to: string;
  subject: string;
  body: string;
}) {
  const subject = encodeURIComponent(params.subject);
  const body = encodeURIComponent(params.body);
  return `mailto:${params.to}?subject=${subject}&body=${body}`;
}
