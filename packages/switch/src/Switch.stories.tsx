import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SWITCH_SIZES } from './constants/size';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '사용자가 설정을 켜고 끌 수 있는 토글 스위치 컴포넌트입니다. 접근성을 고려하여 키보드 네비게이션과 스크린 리더를 지원합니다.',
      },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SWITCH_SIZES),
      description: '스위치의 크기를 설정합니다.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: '제어 컴포넌트로 사용할 때의 체크 상태입니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: '비제어 컴포넌트의 초기 체크 상태입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '스위치의 비활성화 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '스위치와 함께 표시될 라벨 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: '접근성을 위한 aria-label 속성입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': '기본 스위치',
  },
};

export const WithLabel: Story = {
  args: {
    label: '알림 받기',
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    label: '자동 저장',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} label="다크 모드" />
        <p style={{ fontSize: '14px', color: '#666' }}>
          현재 상태: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </p>
        <button
          type="button"
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: '#f9f9f9',
            cursor: 'pointer',
          }}
        >
          외부에서 토글
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '외부 상태로 제어되는 스위치입니다. checked와 onChange를 함께 사용합니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Switch size="sm" label="Small" />
        <span style={{ fontSize: '12px', color: '#666' }}>Small (32×16)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Switch size="md" label="Medium" defaultChecked />
        <span style={{ fontSize: '12px', color: '#666' }}>Medium (40×20)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Switch size="lg" label="Large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Large (48×24)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '스위치의 3가지 크기를 보여줍니다. 기본값은 Medium입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch disabled label="비활성화된 스위치 (OFF)" />
      <Switch disabled defaultChecked label="비활성화된 스위치 (ON)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 스위치입니다. 사용자 상호작용이 불가능합니다.',
      },
    },
  },
};

export const InForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      notifications: true,
      autoSave: false,
      darkMode: false,
      marketing: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`폼 데이터: ${JSON.stringify(formData, null, 2)}`);
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.checked,
      }));
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}
      >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>설정</h3>

        <Switch
          name="notifications"
          checked={formData.notifications}
          onChange={handleChange('notifications')}
          label="푸시 알림 받기"
        />

        <Switch name="autoSave" checked={formData.autoSave} onChange={handleChange('autoSave')} label="자동 저장" />

        <Switch name="darkMode" checked={formData.darkMode} onChange={handleChange('darkMode')} label="다크 모드" />

        <Switch
          name="marketing"
          checked={formData.marketing}
          onChange={handleChange('marketing')}
          label="마케팅 정보 수신 동의"
        />

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>현재 설정:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>{JSON.stringify(formData, null, 2)}</pre>
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            background: '#007AFF',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          설정 저장
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '실제 폼에서 스위치를 사용하는 예제입니다. 여러 스위치의 상태를 관리하고 폼 제출 시 데이터를 수집합니다.',
      },
    },
  },
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>접근성 기능</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
          <li>Tab 키로 포커스 이동</li>
          <li>Space 또는 Enter 키로 토글</li>
          <li>스크린 리더 지원 &lt;role=switch&gt;</li>
          <li>aria-checked 상태 업데이트</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Switch aria-label="첫 번째 스위치" label="aria-label 사용" />
        <Switch aria-labelledby="custom-label" />
        <span id="custom-label" style={{ fontSize: '14px' }}>
          aria-labelledby로 연결된 라벨
        </span>
        <Switch label="기본 라벨" />
      </div>

      <div
        style={{
          padding: '12px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        💡 <strong>사용법:</strong> Tab 키로 스위치에 포커스를 맞춘 후 Space 또는 Enter 키를 눌러보세요.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '스위치의 접근성 기능을 보여줍니다. 키보드 네비게이션과 스크린 리더 지원이 포함되어 있습니다.',
      },
    },
  },
};

export const AsyncToggle: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.3) {
              reject(new Error('설정 저장에 실패했습니다.'));
            } else {
              resolve(undefined);
            }
          }, 1000);
        });

        setChecked(newValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <Switch
          checked={checked}
          disabled={loading}
          onChange={handleToggle}
          label={loading ? '저장 중...' : '서버 동기화'}
        />

        {loading && <div style={{ fontSize: '14px', color: '#007AFF' }}>⏳ 설정을 저장하고 있습니다...</div>}

        {error && (
          <div
            style={{
              fontSize: '14px',
              color: '#FF3B30',
              backgroundColor: '#FFE5E5',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            ❌ {error}
          </div>
        )}

        {!loading && !error && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            현재 상태: <strong>{checked ? 'ON' : 'OFF'}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '서버와 동기화되는 비동기 토글의 예제입니다. 로딩 상태와 에러 처리가 포함되어 있습니다.',
      },
    },
  },
};
