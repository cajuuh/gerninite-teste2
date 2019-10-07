import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: './home',
    home: true,
  },
  {
    title: 'Apontamentos',
    icon: 'calendar-outline',
    link: './apontamentos',
    home: false
  }
];
