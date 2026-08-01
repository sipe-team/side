import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useId } from './useId';

describe('useId', () => {
  test('returns an id prefixed with "side-"', () => {
    const { result } = renderHook(() => useId());
    expect(result.current).toMatch(/^side-/);
  });

  test('returns a different id, both prefixed, for each call site', () => {
    const { result: a } = renderHook(() => useId());
    const { result: b } = renderHook(() => useId());
    expect(a.current).toMatch(/^side-/);
    expect(b.current).toMatch(/^side-/);
    expect(a.current).not.toBe(b.current);
  });

  test('passes a deterministicId through as-is, bypassing the prefix', () => {
    const { result } = renderHook(() => useId('custom-id'));
    expect(result.current).toBe('custom-id');
  });

  test('hydrates server-rendered markup without an id mismatch', () => {
    function Consumer() {
      return <span data-testid="id">{useId()}</span>;
    }

    const html = renderToString(<Consumer />);
    const serverId = html.match(/data-testid="id">([^<]*)</)?.[1];

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    act(() => {
      hydrateRoot(container, <Consumer />);
    });

    const clientId = container.querySelector('[data-testid="id"]')?.textContent;

    expect(serverId).toBeTruthy();
    expect(clientId).toBe(serverId);

    document.body.removeChild(container);
  });
});
