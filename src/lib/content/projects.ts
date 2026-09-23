export type Project = {
  id: string;
};

// The client's order, not a chronology: only two projects carry a date.
export const PROJECTS = [
  { id: 'moda-comidas' },
  { id: 'street-food' },
  { id: 'people-from-atlantic' },
  { id: 'benow-83de' },
  { id: 'audiodise' },
  { id: 'opposite-synk' },
  { id: 'afterwork-estel' },
  { id: 'villa-san-sebastian' },
  { id: 'castillo-montsonis' },
  { id: 'villa-formentera' },
  { id: 'and-friends' },
  { id: 'mercantic-nits' },
  { id: 'studio-stereo' },
] as const satisfies readonly Project[];
