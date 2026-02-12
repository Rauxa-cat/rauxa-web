export type TeamMember = {
  id: string;
  image: string;
};

export const TEAM = [
  {
    id: 'carles',
    image: '/images/team/member-carles-v2.webp',
  },
  {
    id: 'dani',
    image: '/images/team/member-dani-v2.webp',
  },
] as const;
