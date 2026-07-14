import { describe, expect, it } from 'vitest';

import { mapVars } from './utils';

describe('mapVars', () => {
  it('strips side- prefix from a leaf string', () => {
    expect(mapVars('var(--side-spacing-component-xs)')).toBe('var(--spacing-component-xs)');
  });

  it('recursively transforms all leaves in a nested object', () => {
    const input = {
      component: {
        xs: 'var(--side-spacing-component-xs)',
        sm: 'var(--side-spacing-component-sm)',
      },
      layout: {
        md: 'var(--side-spacing-layout-md)',
      },
    };

    expect(mapVars(input)).toEqual({
      component: {
        xs: 'var(--spacing-component-xs)',
        sm: 'var(--spacing-component-sm)',
      },
      layout: {
        md: 'var(--spacing-layout-md)',
      },
    });
  });

  it('leaves strings without side- prefix unchanged', () => {
    expect(mapVars('var(--color-background-base)')).toBe('var(--color-background-base)');
  });
});
