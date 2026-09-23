export const JOIN_INTENTS = ['work', 'collaborate', 'invest', 'other'] as const;

export type JoinIntent = (typeof JOIN_INTENTS)[number];
