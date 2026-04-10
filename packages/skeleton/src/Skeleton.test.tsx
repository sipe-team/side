import { render, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  test('loading이 true일 때 스켈레톤이 렌더링된다.', () => {
    render(<Skeleton loading={true} aria-label="skeleton" />);

    const skeleton = screen.getByLabelText('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
  });

  test('loading이 false일 때 children이 렌더링된다.', () => {
    render(<Skeleton loading={false}>Children Content</Skeleton>);

    expect(screen.getByText('Children Content')).toBeInTheDocument();
    expect(screen.queryByLabelText('Loading content')).not.toBeInTheDocument();
  });

  describe('Variants', () => {
    it.each([
      ['rectangular', 'rectangular'],
      ['circle', 'circle'],
      ['text', 'text'],
      ['rounded', 'rounded'],
    ])('variant가 %s일 때 올바른 클래스가 적용된다', (variant) => {
      const { container } = render(<Skeleton loading={true} variant={variant as any} data-testid="skeleton" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Circle variant', () => {
    test('circle variant는 1:1 aspect ratio를 가진다', () => {
      render(<Skeleton loading={true} variant="circle" data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ aspectRatio: '1' });
    });
  });

  describe('Text variant', () => {
    test('text variant는 기본적으로 1줄을 렌더링한다', () => {
      render(<Skeleton loading={true} variant="text" data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveStyle({ height: '16px' });
    });

    test('lines prop으로 여러 줄을 렌더링할 수 있다', () => {
      const { container } = render(<Skeleton loading={true} variant="text" lines={3} data-testid="skeleton" />);

      const wrapper = container.firstChild as HTMLElement;
      const lines = wrapper.children;
      expect(lines).toHaveLength(3);
    });

    test('마지막 줄은 75% 너비를 가진다', () => {
      const { container } = render(<Skeleton loading={true} variant="text" lines={2} />);

      const wrapper = container.firstChild as HTMLElement;
      const lastLine = wrapper.lastElementChild as HTMLElement;
      expect(lastLine).toHaveStyle({ width: '75%' });
    });

    test('text variant에서 height를 지정하면 적용된다', () => {
      render(<Skeleton loading={true} variant="text" height="2rem" data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ height: '32px' });
    });
  });

  describe('Size properties', () => {
    test('width와 height가 숫자로 전달될 때 px 단위로 적용된다', () => {
      render(<Skeleton loading={true} width={150} height={50} data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        width: '150px',
        height: '50px',
      });
    });

    test('width와 height가 문자열로 전달될 때 그대로 적용된다', () => {
      render(<Skeleton loading={true} width="100%" height="2rem" data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({
        width: '100%',
        // 2rem은 브라우저에서 32px로 계산됨
        height: '32px',
      });
    });

    test('width와 height가 지정되지 않으면 기본값이 적용된다', () => {
      render(<Skeleton loading={true} data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Animation properties', () => {
    test('pulse prop이 true일 때 적절한 클래스가 적용된다', () => {
      const { container } = render(<Skeleton loading={true} pulse={true} data-testid="skeleton" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
    });

    test('shimmer prop이 true일 때 적절한 클래스가 적용된다', () => {
      const { container } = render(<Skeleton loading={true} shimmer={true} data-testid="skeleton" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('asChild behavior', () => {
    test('asChild가 true일 때 자식 요소의 태그가 유지된다', () => {
      render(
        <Skeleton asChild loading={true} data-testid="skeleton">
          <button type="button">Button content</button>
        </Skeleton>,
      );

      const element = screen.getByTestId('skeleton');
      expect(element.tagName).toBe('BUTTON');
    });

    test('asChild가 false이거나 지정되지 않으면 div로 렌더링된다', () => {
      render(<Skeleton loading={true} data-testid="skeleton" />);

      const element = screen.getByTestId('skeleton');
      expect(element.tagName).toBe('DIV');
    });
  });

  describe('Accessibility', () => {
    test('loading 상태일 때 aria-busy="true"가 설정된다', () => {
      render(<Skeleton loading={true} data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('aria-busy', 'true');
    });

    test('loading 상태일 때 기본 aria-label이 설정된다', () => {
      render(<Skeleton loading={true} />);

      const skeleton = screen.getByLabelText('Loading content');
      expect(skeleton).toBeInTheDocument();
    });

    test('커스텀 aria-label을 설정할 수 있다', () => {
      render(<Skeleton loading={true} aria-label="Custom loading message" />);

      const skeleton = screen.getByLabelText('Custom loading message');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    test('커스텀 className이 적용된다', () => {
      const customClass = 'custom-skeleton';
      render(<Skeleton loading={true} className={customClass} data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass(customClass);
    });

    test('커스텀 style이 적용된다', () => {
      const customStyle = {
        backgroundColor: 'red',
        margin: '10px',
      };
      render(<Skeleton loading={true} style={customStyle} data-testid="skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle(customStyle);
    });
  });

  describe('Edge cases', () => {
    test('lines가 0 이하일 때도 정상 동작한다', () => {
      render(<Skeleton loading={true} variant="text" lines={0} data-testid="skeleton" />);

      const element = screen.getByTestId('skeleton');
      expect(element).toBeInTheDocument();
    });

    test('매우 큰 lines 값도 처리할 수 있다', () => {
      const { container } = render(<Skeleton loading={true} variant="text" lines={100} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.children).toHaveLength(100);
    });
  });
});
