import { Button } from '@sipe-team/button';

import buttonProps from '../../.generated/props/button.json';

export const componentRegistry = {
  button: {
    component: Button,
    props: buttonProps,
    scope: { Button },
    defaultChildren: 'Click me',
  },
} as const;

export type ComponentRegistryKey = keyof typeof componentRegistry;
