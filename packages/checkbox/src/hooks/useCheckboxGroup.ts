import { useCallback, useState } from 'react';

interface UseCheckboxGroupProps {
  total: number;
  onChange?: (checkedItems: boolean[], allChecked: boolean, indeterminate: boolean) => void;
}

export const useCheckboxGroup = ({ total, onChange }: UseCheckboxGroupProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(total).fill(false));

  const updateCheckedItems = useCallback(
    (index: number, checked: boolean) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = checked;
      setCheckedItems(newCheckedItems);

      const checkedCount = newCheckedItems.filter(Boolean).length;
      const allChecked = checkedCount === total;
      const indeterminate = checkedCount > 0 && checkedCount < total;

      onChange?.(newCheckedItems, allChecked, indeterminate);
    },
    [checkedItems, total, onChange],
  );

  const setAllChecked = useCallback(
    (checked: boolean) => {
      const newCheckedItems = new Array(total).fill(checked);
      setCheckedItems(newCheckedItems);
      onChange?.(newCheckedItems, checked, false);
    },
    [total, onChange],
  );

  const checkedCount = checkedItems.filter(Boolean).length;
  const allChecked = checkedCount === total;
  const indeterminate = checkedCount > 0 && checkedCount < total;

  return {
    checkedItems,
    updateCheckedItems,
    setAllChecked,
    allChecked,
    indeterminate,
  };
};
