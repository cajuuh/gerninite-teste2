import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private sidebarService: NbSidebarService, layoutService: LayoutService){
    // this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();
  }
}
