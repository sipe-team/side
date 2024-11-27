import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '.';

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 'option1',
    onChangeValue: () => {},
  },
  render(args) {
    return (
      <>
        <RadioGroup size={'large'}>
          <Radio value={'apple'}>사과</Radio>
          <Radio value={'orange'}>오렌지</Radio>
          <Radio value={'grape'}>포도</Radio>
        </RadioGroup>

        <RadioGroup disabled name="fruits" onChangeValue={() => {}}>
          <Radio value="apple">사과</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup labelText="연락 방법" name="contact" size="large">
          <Radio value="EMAIL" defaultChecked>
            이메일
          </Radio>
          <Radio value="PHONE">전화</Radio>
          <Radio value="FAX">팩스</Radio>
          <Radio value="MAIL" disabled>
            우편
          </Radio>
        </RadioGroup>
      </>
    );
  },
};
