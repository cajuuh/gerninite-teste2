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
    home: false,
  },
  {
    title: 'Projetos',
    icon: 'briefcase-outline',
    link: '',
    home: false
  },
  {
    title: 'Colaboradores',
    icon: 'people-outline',
    link: '',
    home: false
  },
  {
    title: 'Clientes',
    icon: 'attach-2-outline',
    link: '',
    home: false
  },
  {
    title: 'Estatísticas',
    icon: 'bar-chart-outline',
    link: '',
    home: false
  }
];
