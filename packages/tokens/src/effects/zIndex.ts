/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type ZIndex = keyof typeof zIndex;
