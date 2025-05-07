import clsx from 'clsx';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { container, input, label } from './Checkbox.css';
import { useControllableState } from './hooks/useControllableState';

export const CheckboxSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;
export type CheckboxSize = (typeof CheckboxSize)[keyof typeof CheckboxSize];

type CheckBoxRootBaseProps = Partial<Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> & {
  size?: CheckboxSize;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
};
interface CheckboxContextValue extends CheckBoxRootBaseProps {
  ref?: Ref<HTMLInputElement> | undefined;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('Checkbox compound components must be used within Checkbox.Root');
  }
  return context;
};

export interface CheckboxRootProps extends CheckBoxRootBaseProps {
  children?: ReactNode;
}

const Root = forwardRef<HTMLInputElement, CheckboxRootProps>(
  (
    {
      className = '',
      size = CheckboxSize.medium,
      indeterminate = false,
      onCheckedChange,
      children,
      style,
      checked,
      ...props
    },
    ref,
  ) => {
    const internalId = useId();
    const id = props.id ?? internalId;

    const [checkedState, setCheckedState] = useControllableState<boolean | undefined>({
      prop: checked,
      defaultProp: props.defaultChecked || false,
      onChange: onCheckedChange || (() => {}),
    });

    const contextValue: CheckboxContextValue = {
      ...props,
      indeterminate,
      ref,
      id,
      size,
      onCheckedChange: setCheckedState,
      checked: checkedState === undefined ? false : checkedState,
    };

    return (
      <div className={clsx(container({ size }), className)} style={style}>
        <CheckboxContext.Provider value={contextValue}>{children}</CheckboxContext.Provider>
      </div>
    );
  },
);

type CheckboxInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'checked' | 'id'>;

const Input = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ onChange, value, name, className, ...props }, ref) => {
    const {
      id,
      checked,
      disabled,
      size,
      onChange: contextOnChange,
      onCheckedChange,
      name: contextName,
      value: contextValue,
      indeterminate,
      ref: contextRef,
      ...rootProps
    } = useCheckbox();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      try {
        if (onChange) {
          onChange(e);
        }

        if (contextOnChange) {
          contextOnChange(e);
        }

        onCheckedChange?.(e.target.checked);
      } catch (error) {
        console.error('Checkbox onChange error', error);
      }
    };

    return (
      <input
        {...rootProps}
        {...props}
        id={id}
        ref={ref || contextRef}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        className={clsx(input({ size, checked, disabled, indeterminate }), className)}
        name={name || contextName}
        value={value || contextValue || 'on'}
      />
    );
  },
);

interface CheckboxLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, CheckboxLabelProps>(({ children, className, ...props }, ref) => {
  const { id, disabled, size } = useCheckbox();

  return (
    <label ref={ref} htmlFor={id ?? props.htmlFor} className={clsx(label({ size, disabled }), className)} {...props}>
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
