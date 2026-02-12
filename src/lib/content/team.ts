export type TeamMember = {
  id: string;
  image: string;
};

export const TEAM = [
  {
    id: 'carles',
    image: '/images/team/member-1.webp',
  },
  {
    id: 'dani',
    image: '/images/team/member-2.webp',
  },
] as const;
