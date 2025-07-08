import type { Meta, StoryObj } from '@storybook/react';

import { color } from '../colors/colors';
import { fontSize, fontWeight, lineHeight } from './fonts';

const meta = {
  title: 'Tokens/Typography',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '40px 20px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: `${fontSize[32]}px`,
              fontWeight: fontWeight.bold,
              marginBottom: '8px',
              color: color.black,
            }}
          >
            SIPE Typography
          </h1>
          <p
            style={{
              fontSize: `${fontSize[14]}px`,
              color: color.gray500,
              margin: '0 0 20px 0',
            }}
          >
            사이프에서 사용하는 타이포그래피입니다.
          </p>
          <div
            style={{
              backgroundColor: color.gray50,
              padding: '16px',
              borderRadius: '8px',
              border: `1px solid ${color.gray200}`,
            }}
          >
            <p
              style={{
                fontSize: `${fontSize[14]}px`,
                fontWeight: fontWeight.semiBold,
                margin: '0',
                color: color.gray700,
              }}
            >
              Pretendard Variable 프리텐다드
            </p>
          </div>
        </div>

        {/* Font Line Height Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: `${fontSize[20]}px`,
              fontWeight: fontWeight.semiBold,
              marginBottom: '24px',
              color: color.black,
            }}
          >
            Font Line Height
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: color.white,
              border: `1px solid ${color.gray200}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: color.gray50 }}>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>T</span>
                  Name
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '50%',
                  }}
                >
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lineHeight).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: `1px solid ${color.gray200}` }}>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>T</span>
                    line-height-{key}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    {Math.round(value * 100)}%
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                      lineHeight: value,
                    }}
                  >
                    사이프 디자인 시스템에서 사용하는
                    <br />줄 간격 예시입니다. 텍스트가 여러 줄일 때<br />줄 사이의 간격을 확인할 수 있습니다.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Font Weight Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: `${fontSize[20]}px`,
              fontWeight: fontWeight.semiBold,
              marginBottom: '24px',
              color: color.black,
            }}
          >
            Font Weight
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: color.white,
              border: `1px solid ${color.gray200}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: color.gray50 }}>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>T</span>
                  Name
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '50%',
                  }}
                >
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fontWeight).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: `1px solid ${color.gray200}` }}>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>T</span>
                    font-weight-{value}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[16]}px`,
                      color: color.black,
                      fontWeight: value,
                    }}
                  >
                    사이프 디자인 시스템
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Font Size Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: `${fontSize[20]}px`,
              fontWeight: fontWeight.semiBold,
              marginBottom: '24px',
              color: color.black,
            }}
          >
            Font Size
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: color.white,
              border: `1px solid ${color.gray200}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: color.gray50 }}>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>T</span>
                  Name
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '25%',
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: fontWeight.semiBold,
                    fontSize: `${fontSize[14]}px`,
                    color: color.gray700,
                    borderBottom: `1px solid ${color.gray200}`,
                    width: '50%',
                  }}
                >
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fontSize).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: `1px solid ${color.gray200}` }}>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>T</span>
                    font-size-{key.padStart(3, '0')}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${fontSize[14]}px`,
                      color: color.black,
                    }}
                  >
                    {value}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      fontSize: `${value}px`,
                      color: color.black,
                      lineHeight: lineHeight.compact,
                    }}
                  >
                    사이프 디자인 시스템
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  },
};
