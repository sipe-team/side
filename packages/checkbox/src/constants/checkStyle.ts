export interface CheckStyleConfig {
  borderRadius?: string | number;
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

export const DEFAULT_CHECK_STYLE: CheckStyleConfig = {
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  backgroundColor: '#FFFFFF',
  checkedColor: '#3B82F6',
  disabledColor: '#E5E7EB',
  hoverColor: '#F3F4F6',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E")`,
  backgroundSize: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;
