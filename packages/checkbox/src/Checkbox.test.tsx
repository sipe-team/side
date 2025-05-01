import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Checkbox, CheckboxSize, type CheckboxRootProps } from './Checkbox';
import { CHECKBOX_SIZES } from './Checkbox.css';
import userEvent from '@testing-library/user-event';

const RenderBasicCheckbox = ({ label, ...props }: CheckboxRootProps & { label?: string }) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Input />
      <Checkbox.Label>{label ?? 'Test Checkbox'}</Checkbox.Label>
    </Checkbox.Root>
  );
};

describe('Checkbox', () => {
  test('should be checked when checked prop is true', () => {
    render(<RenderBasicCheckbox checked={true} />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('should call onCheckChange when label is clicked', () => {
    const handleChange = vi.fn();
    render(<RenderBasicCheckbox onCheckChange={handleChange} />);
    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('should call onCheckChange when checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<RenderBasicCheckbox onCheckChange={handleChange} />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox Styling', () => {
  test('should apply custom styles to all components', () => {
    const testRootStyle = { backgroundColor: 'red' };
    const testInputStyle = { backgroundColor: 'blue' };
    const testLabelStyle = { color: 'green' };

    render(
      <Checkbox.Root style={testRootStyle}>
        <Checkbox.Input style={testInputStyle} />
        <Checkbox.Label style={testLabelStyle}>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );
    const label = screen.getByText('Test Checkbox');
    const checkbox = screen.getByRole('checkbox');
    const container = label.parentElement;
    expect(container).toHaveStyle(testRootStyle);
    expect(checkbox).toHaveStyle(testInputStyle);
    expect(label).toHaveStyle(testLabelStyle);
  });

  test('should apply custom classNames to all components', () => {
    const testRootClass = 'root-class';
    const testInputClass = 'input-class';
    const testLabelClass = 'label-class';

    render(
      <Checkbox.Root className={testRootClass}>
        <Checkbox.Input className={testInputClass} />
        <Checkbox.Label className={testLabelClass}>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const label = screen.getByText('Test Checkbox');
    const checkbox = screen.getByRole('checkbox');
    const container = label.parentElement;

    expect(container).toHaveClass(testRootClass);
    expect(checkbox).toHaveClass(testInputClass);
    expect(label).toHaveClass(testLabelClass);
  });

  test('should be unchecked by default when checked prop is not provided', () => {
    render(<RenderBasicCheckbox />);

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('should be checked when checked prop is true', () => {
    render(<RenderBasicCheckbox checked={true} />);

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('should be enabled by default when disabled prop is not provided', () => {
    render(<RenderBasicCheckbox />);

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(false);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<RenderBasicCheckbox disabled={true} />);

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  test.each(Object.values(CheckboxSize))('should have correct size when size prop is %s', (size) => {
    render(<RenderBasicCheckbox size={size} />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toHaveStyle({
      width: CHECKBOX_SIZES[size].inputSize,
      height: CHECKBOX_SIZES[size].inputSize,
    });
  });

  test('should have medium size by default when size prop is not provided', () => {
    render(<RenderBasicCheckbox />);

    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toHaveStyle({
      width: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
      height: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
    });
  });
});

describe('Checkbox Event Handling', () => {
  test('should call onCheckChange when checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<RenderBasicCheckbox onCheckChange={handleChange} />);

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox Group Behavior', () => {
  test('should handle multiple checkboxes with same name as a group', async () => {
    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      return formData;
    });

    render(
      <form onSubmit={handleSubmit} data-testid="test-form">
        <RenderBasicCheckbox name="fruits" value="apple" id="apple" label="Apple" />
        <RenderBasicCheckbox name="fruits" value="banana" id="banana" label="Banana" />
        <RenderBasicCheckbox name="fruits" value="orange" id="orange" label="Orange" />
        <button type="submit">Submit</button>
      </form>,
    );

    const appleCheckbox = screen.getByLabelText('Apple');
    const orangeCheckbox = screen.getByLabelText('Orange');
    await userEvent.click(appleCheckbox);
    await userEvent.click(orangeCheckbox);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();

    const formDataEntries = Array.from(handleSubmit.mock.results[0]?.value?.entries() ?? []);

    const fruitValues = formDataEntries
      .filter((entry): entry is [string, string] => Array.isArray(entry) && entry[0] === 'fruits')
      .map(([, value]) => value);

    expect(fruitValues).toContain('apple');
    expect(fruitValues).toContain('orange');
    expect(fruitValues).not.toContain('banana');
    expect(fruitValues.length).toBe(2);
  });

  test('should not include unchecked checkboxes in form data', async () => {
    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      return formData;
    });

    render(
      <form onSubmit={handleSubmit} data-testid="test-form">
        <RenderBasicCheckbox name="option1" value="value1" id="option1" label="Option 1" />
        <RenderBasicCheckbox name="option2" value="value2" id="option2" label="Option 2" />

        <button type="submit">Submit</button>
      </form>,
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();

    const formDataEntries = Array.from(handleSubmit.mock.results[0]?.value?.entries() ?? []);

    const hasOption1 =
      formDataEntries.filter((entry): entry is [string, string] => Array.isArray(entry) && entry[0] === 'option1')
        .length > 0;
    const hasOption2 =
      formDataEntries.filter((entry): entry is [string, string] => Array.isArray(entry) && entry[0] === 'option2')
        .length > 0;

    expect(hasOption1).toBe(false);
    expect(hasOption2).toBe(false);
  });
});

describe('Checkbox Label Connection', () => {
  test('should check checkbox when clicking associated label', () => {
    const handleChange = vi.fn();

    render(<RenderBasicCheckbox onCheckChange={handleChange} />);

    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('should automatically connect label and input with generated ID', () => {
    const handleChange = vi.fn();

    render(<RenderBasicCheckbox onCheckChange={handleChange} />);

    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Required Checkbox Behavior', () => {
  test('should block form submission when required checkbox is unchecked', async () => {
    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
    });

    const handleInvalid = vi.fn();

    render(
      <form onSubmit={handleSubmit} data-testid="test-form">
        <RenderBasicCheckbox name="agreement" required onInvalid={handleInvalid} id="agreement" />
        <button type="submit">Submit</button>
      </form>,
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleInvalid).toHaveBeenCalled();
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
