export type CheckboxSize = 'small' | 'medium' | 'large';

interface SizeConfig {
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

export interface CheckboxStyleConfig {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  checkedColor?: string;
  disabledColor?: string;
  hoverColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

export const DEFAULT_CHECKBOX_STYLE: CheckboxStyleConfig = {
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  backgroundColor: '#FFFFFF',
  checkedColor: '#3B82F6',
  disabledColor: '#E5E7EB',
  hoverColor: '#F3F4F6',
} as const;
