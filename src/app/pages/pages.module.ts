import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ApontamentosComponent } from './apontamentos/apontamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ApontamentosModule } from './apontamentos/apontamentos.module';
import { CanvasChartComponent } from './apontamentos/canvas-chart/canvas-chart.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    ApontamentosModule,
  ],
  declarations: [
    PagesComponent,
    ApontamentosComponent,
    DashboardComponent,
    HomeComponent,
    CanvasChartComponent
  ],
})
export class PagesModule {
}
