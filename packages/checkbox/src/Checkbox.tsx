import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  type ChangeEventHandler,
  type CSSProperties,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { container, input, label } from './Checkbox.css';
import { useControllableState } from './hooks/useControllableState';
import { useIndeterminateCheckbox } from './hooks/useIndeterminateCheckbox';

export const CheckboxSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;
export type CheckboxSize = (typeof CheckboxSize)[keyof typeof CheckboxSize];

interface CheckboxContextValue {
  id: string;
  checked: boolean;
  disabled: boolean;
  size: CheckboxSize;
  onChange: (checked: boolean) => void;
  name?: string;
  indeterminate?: boolean;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('Checkbox compound components must be used within Checkbox.Root');
  }
  return context;
};

interface CheckboxRootProps {
  className?: string;
  size?: CheckboxSize;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  children: ReactNode;
  name?: string;
  style?: CSSProperties;
}

const Root = forwardRef<HTMLDivElement, CheckboxRootProps>(
  (
    {
      className = '',
      size = CheckboxSize.medium,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      onCheckboxChange,
      children,
      name,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const handleChange = (newValue: boolean) => {
      onCheckboxChange?.(newValue);
    };

    const [checkedState, setCheckedState] = useControllableState<boolean>({
      prop: checked,
      defaultProp: defaultChecked || false,
      onChange: handleChange,
    });

    const contextValue: CheckboxContextValue = {
      id,
      checked: checkedState === undefined ? false : checkedState,
      indeterminate,
      disabled,
      size,
      name: name || '',
      onChange: setCheckedState,
    };

    return (
      <div ref={ref} className={container({ size })} {...props}>
        <CheckboxContext.Provider value={contextValue}>{children}</CheckboxContext.Provider>
      </div>
    );
  },
);

interface CheckboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'checked'> {
  value?: string;
}

const Input = forwardRef<HTMLInputElement, CheckboxInputProps>(({ className = '', onChange, ...props }, ref) => {
  const { id, checked, disabled, size, onChange: onCheckboxChange, name: contextName, indeterminate } = useCheckbox();

  const indeterminateRef = useIndeterminateCheckbox(indeterminate);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onCheckboxChange(e.target.checked);
    onChange?.(e);
  };

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      indeterminateRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref, indeterminateRef],
  );

  return (
    <input
      id={id}
      ref={setRefs}
      type="checkbox"
      name={contextName}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
      className={input({ size, checked, disabled, indeterminate })}
      {...props}
    />
  );
});

interface CheckboxLabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, CheckboxLabelProps>(({ children, className = '', ...props }, ref) => {
  const { id, disabled, size } = useCheckbox();

  return (
    <label ref={ref} htmlFor={id} className={label({ size, disabled })} {...props}>
      {children}
    </label>
  );
});

Root.displayName = 'Checkbox.Root';
Input.displayName = 'Checkbox.Input';
Label.displayName = 'Checkbox.Label';

export const Checkbox = {
  Root,
  Input,
  Label,
};
