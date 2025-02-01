import CheckboxIcon from '../images/checkbox-icon.svg';
import minusIcon from '../images/minus-icon.svg';

export interface CheckStyleConfig {
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  checkedColor: string;
  disabledColor: string;
  hoverColor: string;
  checkedIcon: string;
  indeterminateIcon: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundRepeat: string;
}

export const DEFAULT_CHECK_STYLE: CheckStyleConfig = {
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  backgroundColor: '#FFFFFF',
  checkedColor: '#3B82F6',
  disabledColor: '#E5E7EB',
  hoverColor: '#F3F4F6',
  checkedIcon: CheckboxIcon,
  indeterminateIcon: minusIcon,
  backgroundSize: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;
