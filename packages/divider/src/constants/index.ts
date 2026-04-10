export const DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type OrientationType = (typeof DIVIDER_ORIENTATIONS)[number];

export const DIVIDER_COLORS = ['default', 'primary', 'dark'] as const;
export type ColorType = (typeof DIVIDER_COLORS)[number];
