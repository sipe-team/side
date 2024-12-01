# useTooltip

`useTooltip`은 툴팁 컴포넌트의 가시성과 위치를 제어하는 커스텀 훅입니다. 사용자가 `hover`하거나 `click`을 통해 툴팁을 활성화할 수 있으며, 툴팁은 화면의 경계를 고려하여 적절한 위치에 렌더링됩니다.

## Parameters

- `placement`: 'top' | 'bottom' | 'left' | 'right' (필수) - 툴팁이 나타날 위치를 지정합니다.
- `gap`: number - 툴팁과 트리거 요소 간의 간격을 픽셀 단위로 지정합니다.
- `trigger`: 'hover' | 'click' - 툴팁을 활성화하는 트리거 방식입니다.


## Return

- `isVisible`: boolean - 툴팁이 현재 보이는 상태인지 나타냅니다.
- `toggleTooltip`: (visible: boolean) => void - 툴팁의 가시성을 토글합니다.
- `tooltipStyles`: CSSProperties - 툴팁의 `style` 속성으로 적용할 위치와 스타일 값을 제공합니다.
- `wrapperRef`: `RefObject<HTMLDivElement>` - 툴팁의 트리거 요소를 감싸는 컨테이너의 참조입니다.
- `tooltipRef`: `RefObject<HTMLDivElement>` - 툴팁의 DOM 요소에 대한 참조입니다.
- `handleKeyDown`: `(event: React.KeyboardEvent<HTMLDivElement>) => void` - 키보드 이벤트(`Enter`, `Space`, `Escape`)에 따른 툴팁 제어를 처리합니다.

## Example

### 기본 사용
```jsx
import { useTooltip } from './hooks/useTooltip';

const TooltipComponent = () => {
  const {
    isVisible,
    toggleTooltip,
    tooltipStyles,
    wrapperRef,
    tooltipRef,
    handleKeyDown,
  } = useTooltip({ placement: 'top', gap: 8, trigger: 'hover' });

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ display: 'inline-block' }}
    >
      Hover over me
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            ...tooltipStyles,
            backgroundColor: '#000',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '4px',
          }}
        >
          Tooltip Content
        </div>
      )}
    </div>
  );
};
```

### 클릭 트리거로 사용
```jsx
import { useTooltip } from './hooks/useTooltip';

const ClickTooltipComponent = () => {
  const {
    isVisible,
    toggleTooltip,
    tooltipStyles,
    wrapperRef,
    tooltipRef,
    handleKeyDown,
  } = useTooltip({ placement: 'bottom', gap: 10, trigger: 'click' });

  return (
    <div
      ref={wrapperRef}
      onClick={() => toggleTooltip(!isVisible)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      Click me
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            ...tooltipStyles,
            backgroundColor: '#333',
            color: '#fff',
            padding: '8px',
            borderRadius: '4px',
            maxWidth: '200px',
          }}
        >
          Tooltip Content
        </div>
      )}
    </div>
  );
};
```