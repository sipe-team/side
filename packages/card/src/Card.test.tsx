import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Card } from './Card';

function ruleForClass(className: string): string {
  const target = `.${className}`;
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!('selectorText' in rule)) continue;
      const selectorText = (rule as CSSStyleRule).selectorText ?? '';
      const matches = selectorText.split(',').some((s) => s.trim() === target);
      if (matches) return rule.cssText;
    }
  }
  return '';
}

function rulesForElement(el: HTMLElement): string {
  return el.className.split(/\s+/).filter(Boolean).map(ruleForClass).join('\n');
}

test('renders children passed to Card', () => {
  render(
    <Card>
      <span>Card</span>
    </Card>,
  );

  expect(screen.getByText('Card')).toBeInTheDocument();
});

test('centers content by default', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
});

test('applies default aspect-ratio 16/9 when ratio is not provided', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 16 / 9');
});

test('applies aspect-ratio 21/9 when ratio is "wide"', () => {
  render(<Card ratio="wide">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 21 / 9');
});

test('applies aspect-ratio 1/1 when ratio is "square"', () => {
  render(<Card ratio="square">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 1 / 1');
});

test('applies aspect-ratio 3/4 when ratio is "portrait"', () => {
  render(<Card ratio="portrait">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 3 / 4');
});

test('applies aspect-ratio auto when ratio is "auto"', () => {
  render(<Card ratio="auto">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: auto');
});

test('defaults to filled variant referencing subtle background and default border tokens', () => {
  render(<Card>Card</Card>);
  const applied = rulesForElement(screen.getByText('Card'));
  expect(applied).toContain('var(--side-color-background-subtle)');
  expect(applied).toContain('var(--side-color-border-default)');
});

test('outline variant references base background and border.strong tokens', () => {
  render(<Card variant="outline">Card</Card>);
  const applied = rulesForElement(screen.getByText('Card'));
  expect(applied).toContain('var(--side-color-background-base)');
  expect(applied).toContain('var(--side-color-border-strong)');
});

test('filled variant uses subtle background token', () => {
  render(<Card variant="filled">Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-color-background-subtle)');
});

test('outline variant uses base background token', () => {
  render(<Card variant="outline">Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-color-background-base)');
});

test('ghost variant has transparent background', () => {
  render(<Card variant="ghost">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    backgroundColor: 'transparent',
  });
});

test('ghost variant has no border', () => {
  render(<Card variant="ghost">Card</Card>);
  const applied = rulesForElement(screen.getByText('Card'));
  expect(applied).toMatch(/border-style:\s*none/);
});

test('ghost variant has no padding', () => {
  render(<Card variant="ghost">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    padding: '0',
  });
});

test('applies semantic component spacing token as padding', () => {
  render(<Card>Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-spacing-component-lg)');
});

test('applies semantic component radius token as border-radius', () => {
  render(<Card>Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-radius-component-lg)');
});
