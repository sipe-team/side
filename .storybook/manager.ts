import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Sipe Design System',
    brandImage: '../public/assets/sipe_branch_logo.png',
    brandUrl: 'https://sipe.team/',
    brandTarget: '_self',
    textColor: '#999999',
    colorSecondary: '#00FF99',
    barSelectedColor: '#00FF99',
    barHoverColor: '#00CC7A',
  }),
});
