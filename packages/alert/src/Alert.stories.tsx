import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Meta, StoryObj } from '@storybook/react';
import * as Alert from './Alert';

const meta = {
  title: 'Alert',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render() {
    return (
      <Alert.Root>
        <Alert.Icon>
          <CheckCircleIcon />
        </Alert.Icon>
        <Alert.Text>
          격주 토요일 오후 2시 ~ 6시에 진행되는 정규 활동에 성실하게 참여할 수
          있는
        </Alert.Text>
      </Alert.Root>
    );
  },
};
