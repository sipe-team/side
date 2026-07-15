import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion.Root default styles', () => {
  test('sets border-radius to default "12px" when no border-radius is provided', () => {
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

  test('sets border to default "1px solid #2d3748" when no border is provided', () => {
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

  test('sets background-color to default "#1a202c" when no background-color is provided', () => {
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

  test('sets padding to default "20px" when no padding is provided', () => {
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

describe('Accordion.Trigger default styles and component structure', () => {
  test('text in Trigger is left-aligned by default', () => {
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

  test('aria-expanded reflects the expanded/collapsed state of the element', () => {
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

  test('renders an icon using Accordion.Indicator', () => {
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

describe('Accordion.Content default styles', () => {
  test('sets borderRadius to default 8px when no borderRadius is provided', () => {
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

  test('sets background-color to default #2d3748 when no background-color is provided', () => {
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

  test('sets padding to default "12px 16px" when no padding is provided', () => {
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

describe('Accordion behavior', () => {
  test('clicking Trigger toggles Content visibility', () => {
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

describe('Accordion single mode', () => {
  test('opening one item closes the other when type="single"', () => {
    render(
      <Accordion.Root type="single">
        <Accordion.Item value="item1">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Trigger 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const trigger1 = screen.getByText('Trigger 1');
    const trigger2 = screen.getByText('Trigger 2');
    const wrapper1 = screen.getByText('Content 1').closest('[class*="accordionContentWrapper"]');
    const wrapper2 = screen.getByText('Content 2').closest('[class*="accordionContentWrapper"]');

    expect(wrapper1).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper2).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(trigger1);
    expect(wrapper1).toHaveAttribute('aria-hidden', 'false');
    expect(wrapper2).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(trigger2);
    expect(wrapper1).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper2).toHaveAttribute('aria-hidden', 'false');
  });

  test('clicking an already open item closes it when type="single"', () => {
    render(
      <Accordion.Root type="single">
        <Accordion.Item value="item1">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const trigger = screen.getByText('Trigger 1');
    const wrapper = screen.getByText('Content 1').closest('[class*="accordionContentWrapper"]');

    fireEvent.click(trigger);
    expect(wrapper).toHaveAttribute('aria-hidden', 'false');

    fireEvent.click(trigger);
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Accordion structure', () => {
  test('renders children passed to Accordion correctly', () => {
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
