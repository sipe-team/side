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

test('children으로 넘어간 요소를 반환한다.', () => {
  render(
    <Card>
      <span>Card</span>
    </Card>,
  );

  expect(screen.getByText('Card')).toBeInTheDocument();
});

test('Card는 default로 요소를 중앙정렬한다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
});

test('ratio가 default로 aspect-ratio는 16/9로 반환한다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 16 / 9');
});

test('ratio에 wide로 넣으면 aspect-ratio는 21/9로 반환한다.', () => {
  render(<Card ratio="wide">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 21 / 9');
});

test('ratio에 square로 넣으면 aspect-ratio는 1/1로 반환한다.', () => {
  render(<Card ratio="square">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 1 / 1');
});

test('ratio에 portrait로 넣으면 aspect-ratio는 3/4로 반환한다.', () => {
  render(<Card ratio="portrait">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 3 / 4');
});

test('ratio에 auto로 넣으면 aspect-ratio는 auto로 반환한다.', () => {
  render(<Card ratio="auto">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: auto');
});

test('variant는 default로 filled이며 subtle 배경과 default 보더 semantic 토큰을 참조한다.', () => {
  render(<Card>Card</Card>);
  const applied = rulesForElement(screen.getByText('Card'));
  expect(applied).toContain('var(--side-color-background-subtle)');
  expect(applied).toContain('var(--side-color-border-default)');
});

test('variant가 outline이면 base 배경과 border.strong semantic 토큰을 참조한다.', () => {
  render(<Card variant="outline">Card</Card>);
  const applied = rulesForElement(screen.getByText('Card'));
  expect(applied).toContain('var(--side-color-background-base)');
  expect(applied).toContain('var(--side-color-border-strong)');
});

test('variant가 filled일 때 subtle 배경 토큰을 사용한다.', () => {
  render(<Card variant="filled">Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-color-background-subtle)');
});

test('variant가 outline일 때 base 배경 토큰을 사용한다.', () => {
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

test('Card는 semantic 컴포넌트 패딩 토큰을 적용한다.', () => {
  render(<Card>Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-spacing-component-lg)');
});

test('Card는 semantic 컴포넌트 반경 토큰을 적용한다.', () => {
  render(<Card>Card</Card>);
  expect(rulesForElement(screen.getByText('Card'))).toContain('var(--side-radius-component-lg)');
});
