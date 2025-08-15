import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion.Root 기본 스타일', () => {
  test('Accordion의 Root에 border-radius를 주입하지 않으면 기본 값 "12px"으로 border-radius를 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const root = screen.getByText('Test Trigger').closest('[class*="accordionRoot"]');
    expect(root).toHaveStyle({ borderRadius: '12px' });
  });

  test('Accordion의 Root에 border 옵션을 주입하지 않으면 기본 값 "1px solid #2d3748"로 border를 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const root = screen.getByText('Test Trigger').closest('[class*="accordionRoot"]');
    expect(root).toHaveStyle({ border: '1px solid #2d3748' });
  });

  test('Accordion의 Root에 background-color 옵션을 주입하지 않으면 기본 값 "#1a202c"로 background-color를 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const root = screen.getByText('Test Trigger').closest('[class*="accordionRoot"]');
    expect(root).toHaveStyle({ backgroundColor: '#1a202c' });
  });

  test('Accordion의 Root에 padding 옵션을 주입하지 않으면 기본 값 "20px"로 padding을 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const root = screen.getByText('Test Trigger').closest('[class*="accordionRoot"]');
    expect(root).toHaveStyle({ padding: '20px' });
  });
});

describe('Accordion.Trigger 기본 스타일 및 컴포넌트 구조', () => {
  test('Accordion의 Trigger에 존재하는 텍스트는 기본적으로 왼쪽 정렬된다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByText('Test Trigger').closest('[class*="accordionTrigger"]');
    expect(trigger).toHaveStyle({
      textAlign: 'left',
    });
  });

  test('aria-expanded를 통해 요소 확장 및 축소 여부를 확인할 수 있다', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('Accordion.Indicator를 사용하여 아이콘을 렌더링할 수 있다', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>
            Test Trigger
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger.querySelector('svg')).toBeInTheDocument();
  });
});

describe('Accordion.Content 기본 스타일', () => {
  test('Accordion의 Content에 borderRadius를 주입하지 않으면 기본 값 8px으로 borderRadius를 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item defaultOpen>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const contentElement = screen.getByText('Test Content').closest('[class*="accordionContentWrapper"]');
    expect(contentElement).toHaveStyle({ borderRadius: '8px' });
  });

  test('Accordion의 Content에 background-color를 주입하지 않으면 기본 값 #2d3748으로 background-color를 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item defaultOpen>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const contentElement = screen.getByText('Test Content').closest('[class*="accordionContentWrapper"]');
    expect(contentElement).toHaveStyle({ backgroundColor: '#2d3748' });
  });

  test('Accordion의 Content에 padding을 주입하지 않으면 기본 값 12px 16px으로 padding을 설정한다.', () => {
    render(
      <Accordion.Root>
        <Accordion.Item defaultOpen>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toHaveStyle({ padding: '12px 16px' });
  });
});

describe('Accordion 동작', () => {
  test('Trigger 클릭 시 Content의 내용을 노출 및 숨김 처리할 수 있다', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Test Trigger</Accordion.Trigger>
          <Accordion.Content>Test Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByRole('button');
    const wrapper = screen.getByText('Test Content').closest('[class*="accordionContentWrapper"]');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    fireEvent.click(trigger);
    expect(wrapper).toHaveAttribute('aria-hidden', 'false');
    fireEvent.click(trigger);
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Accordion 구조', () => {
  test('Accordion의 children으로 전달한 요소를 올바르게 렌더링할 수 있다', () => {
    render(
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>Custom Trigger</Accordion.Trigger>
          <Accordion.Content>
            <p>Paragraph</p>
            <span>Span</span>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Span')).toBeInTheDocument();
  });
});
