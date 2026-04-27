/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
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

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type ZIndex = keyof typeof zIndex;
