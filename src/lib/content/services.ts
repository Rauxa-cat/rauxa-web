export type Service = {
  id: string;
  formUrl: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: 'cenas-rauxa',
    formUrl: 'https://form.typeform.com/to/nMlilHvx',
    featured: true,
  },
  {
    id: 'cenas-privadas',
    formUrl: 'https://form.typeform.com/to/tv5pQvrK',
  },
  {
    id: 'eventos',
    formUrl: 'https://form.typeform.com/to/MHhJPbMT',
    featured: true,
  },
  {
    id: 'catering',
    formUrl: 'https://form.typeform.com/to/HA2r8vU6',
  },
  {
    id: 'dj',
    formUrl: 'https://form.typeform.com/to/L2ZLQ6dW',
  },
  {
    id: 'marcas',
    formUrl: 'https://form.typeform.com/to/RFhbBMfE',
    featured: true,
  },
];
