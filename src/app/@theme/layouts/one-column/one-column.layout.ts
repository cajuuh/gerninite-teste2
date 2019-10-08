import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" state="compacted">
      <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8ZyBjbGFzcz0ibG9nb19faXRlbSIgaWQ9ImxvZ29fX2l0ZW0tLWJ1c2luZXNzIj4KICAgPGcgaWQ9InN2Z18xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1OTEuMDc4MTI1LDQwMy44NzY3NzAwMTk1MzEyNSkgc2NhbGUoMSkgIiBjbGFzcz0ibG9nb19faXRlbV9faW5uZXIiPgogICAgPHRleHQgeD0iLTU4Ni42NjY2ODciIHk9Ii0yNTIuNDQ0NDQzIiBpZD0ic3ZnXzIiIGZvbnQtc3R5bGU9Im5vcm1hbCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMyOUFBRTIiIGZvbnQtc2l6ZT0iMzJweCIgZm9udC1mYW1pbHk9Ik1vbnRzZXJyYXQiPmdlcm5pbmk8L3RleHQ+CiAgIDwvZz4KICA8L2c+CiAgPGcgc3Ryb2tlPSJudWxsIiBjbGFzcz0ibG9nb19faXRlbSIgaWQ9ImxvZ29fX2l0ZW0tLWxvZ29fMCI+CiAgIDxnIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NzguMTE0NTYyOTg4MjgxMiwyMzYpIHNjYWxlKDAuOTE1MzE4MDEyMjM3NTQ4OCkgIiBjbGFzcz0ibG9nb19faXRlbV9faW5uZXIiPgogICAgPGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzQiPgogICAgIDxwYXRoIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBpZD0ic3ZnXzUiIGQ9Im0tNTA0LjMyOTYyMSwtMjQwLjQ3NzA3N2wtMTYuNywwYy00LjUsMCAtOC4yLDMuNyAtOC4yLDguMmwwLDUuN2wxMy42LDcuOWwwLDExLjRsMTEuMywwYzQuNSwwIDguMiwtMy43IDguMiwtOC4ybDAsLTE2LjhjMC4xLC00LjUgLTMuNiwtOC4yIC04LjIsLTguMnoiIGZpbGw9IiMyOUFBRTIiLz4KICAgICA8cGF0aCBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgaWQ9InN2Z182IiBkPSJtLTUxOC4xMjk2MjEsLTIwNy4yNzcwNzdjLTUuMiwwIC0xMS4zLC0wLjYgLTExLjMsNy4ybDAsOC41YzAsMy4yIC0yLjYsNS43IC01LjcsNS43bC0xMS42LDBjLTMuMiwwIC01LjcsLTIuNiAtNS43LC01LjdsMCwtOS4xYzAsLTQuOSAtMS40LC03LjIgLTcuNCwtNy4ybC01LjQsMGMtNi42LDAgLTguNSwzLjkgLTguNSwxMC4ybDAsOS4yYzAsOS4yIDMuOSwxMC4zIDEwLjYsMTAuM2wxOS4xLDBjNC4xLDAgNy40LDMuNCA3LjQsNy41bDAsMjNjMCw0LjEgLTMuNCw3LjUgLTcuNCw3LjVsLTIzLDBjLTQuMSwwIC03LjQsLTMuNCAtNy40LC03LjVsMCwtMTguOWMwLC03LjUgLTEuOSwtMTAuNyAtMTAuNywtMTAuN2wtMTEuOCwwYy00LjIsMCAtNy43LC0zLjUgLTcuNywtNy43bDAsLTE1LjVjMCwtNC4yIDMuNCwtNy43IDcuNywtNy43bDEwLjksMGM3LjMsMCAxMS4yLC0yIDExLjIsLTkuNWwwLC04YzAsLTMuMiAyLjYsLTUuOCA1LjgsLTUuOGwxMS44LDBjMy4yLDAgNS44LDIuNiA1LjgsNS44bDAsOC42YzAsNi41IDMuNSw4IDguOSw4bDQuNSwwYzcuNiwwIDguOSwtMy41IDguOSwtOS41bDAsLThsLTQyLjIsLTI0LjRsLTU1LjksMzIuM2wwLDY0LjZsMTAuMyw2YzAsMCAwLC0wLjEgMCwtMC4xbDAsLTEyLjhjMCwtMi44IDIuMywtNS4yIDUuMiwtNS4ybDEyLjcsMGMyLjgsMCA1LjEsMi4zIDUuMSw1LjJsMCwxMi44YzAsMi44IC0yLjMsNS4yIC01LjEsNS4ybC05LjIsMGwzNi44LDIxLjNsNTUuOCwtMzIuM2wwLC01My4ybC0yLjUsMGwwLC0wLjF6IiBmaWxsPSIjMDBBNjlDIi8+CiAgICA8L2c+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg==" style="width: auto;height: 60px;margin-left: -4px;"/>
        <ng-content select="nb-menu">
        </ng-content>
        <div class="space-between"></div>
        <nb-action class="control-item" icon="bell-outline"></nb-action>
        <nb-action icon="power-outline"></nb-action>
        <nb-action class="user-action" *nbIsGranted="['view', 'user']">
          <nb-user [nbContextMenu]="userMenu" [onlyPicture]="true" [name]="user?.name" [picture]="user?.picture">
          </nb-user>
        </nb-action>
      </nb-sidebar>
      <nb-layout-column>
      <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit{
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.nick
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }
}
