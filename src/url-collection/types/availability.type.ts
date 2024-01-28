export const availability = ['PUBLIC', 'PRIVATE', 'LIMITED'] as const;

export type Availability = (typeof availability)[number];
