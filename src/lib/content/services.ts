export const SERVICE_IDS = [
  'show-del-postre',
  'colaboraciones',
  'eventos',
  'catering',
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];
