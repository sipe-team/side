import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Sipe Design System',
    brandImage: 'https://github.com/sipe-team/3-2_side/raw/main/public/assets/sipe_brand_logo.png',
    brandUrl: 'https://sipe.team/',
    brandTarget: '_self',
    textColor: '#999999',
    colorSecondary: '#007043',
    barSelectedColor: '#007043',
    barHoverColor: '#00CC7A',
  }),
});
