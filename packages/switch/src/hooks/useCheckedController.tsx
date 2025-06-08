import { useState } from 'react';

type UseCheckedControllerProps = {
  defaultChecked: boolean | undefined;
  checked: boolean | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

function useCheckedController({ defaultChecked, checked, onChange }: UseCheckedControllerProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked ?? !!defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const overrideOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    onChange?.(event);
  };

  return {
    checked: isChecked,
    onChange: overrideOnChange,
  };
}

export default useCheckedController;
