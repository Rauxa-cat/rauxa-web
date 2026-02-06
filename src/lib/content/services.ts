export type Service = {
  id: string;
  title: string;
  desc: string;
  formUrl: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: 'cenas-rauxa',
    title: 'Cenas RAUXA',
    desc: 'Cenas privadas donde se unen gastronomía, música y arte. Acceso exclusivo para la comunidad oficial.',
    formUrl: 'https://form.typeform.com/to/nMlilHvx',
    featured: true,
  },
  {
    id: 'cenas-privadas',
    title: 'Cenas privadas',
    formUrl: 'https://form.typeform.com/to/tv5pQvrK',
    desc: 'Cuéntanos qué tienes en mente y lo hacemos realidad. Experiencias a medida para tu ocasión.',
  },
  {
    id: 'eventos',
    title: 'Organización de eventos',
    formUrl: 'https://form.typeform.com/to/MHhJPbMT',
    desc: 'Eventos completos: gastronomía, música, DJs, animación y espacios. Nos encargamos de todo.',
    featured: true,
  },
  {
    id: 'catering',
    title: 'Catering',
    formUrl: 'https://form.typeform.com/to/HA2r8vU6',
    desc: 'Solo comida. Preparamos y entregamos el catering listo para servir, sin producción adicional.',
  },
  {
    id: 'dj',
    title: 'Servicios de DJ',
    formUrl: 'https://form.typeform.com/to/L2ZLQ6dW',
    desc: 'Sesiones adaptadas a cada evento. Encontramos el DJ y el estilo que encaje con tu vibe.',
  },
  {
    id: 'marcas',
    title: 'Colaboraciones con marcas',
    desc: 'Pop-ups, eventos, shootings y lanzamientos. Propuestas alineadas con identidad y objetivos.',
    formUrl: 'https://form.typeform.com/to/RFhbBMfE',
    featured: true,
  },
];
