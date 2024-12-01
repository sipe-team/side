import type { ComponentProps } from 'react';

export interface SwitchProps extends ComponentProps<'input'> {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Switch() {
  return <div>Switch</div>;
}
