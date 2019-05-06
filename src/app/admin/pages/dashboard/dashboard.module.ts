import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StatModule } from '../../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    StatModule,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
