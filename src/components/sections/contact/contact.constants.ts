export const CONTACT = {
  email: 'info@rauxa.cat',
  phoneDisplay: '+34 647 25 07 28',
  phoneE164: '+34647250728',
  location: 'Barcelona, Catalunya',
  whatsappUrl: 'https://wa.me/34647250728',
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
