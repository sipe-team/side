export type CheckboxSize = 'small' | 'medium' | 'large';

export interface SizeConfig {
  checkboxSize: number;
  labelSize: number;
  padding: number;
  margin: number;
}

export const CHECKBOX_SIZES: Record<CheckboxSize, SizeConfig> = {
  small: {
    checkboxSize: 16,
    labelSize: 14,
    padding: 8,
    margin: 4,
  },
  medium: {
    checkboxSize: 20,
    labelSize: 16,
    padding: 10,
    margin: 6,
  },
  large: {
    checkboxSize: 24,
    labelSize: 18,
    padding: 12,
    margin: 8,
  },
} as const;
