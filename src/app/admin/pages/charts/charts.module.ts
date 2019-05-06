import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';

@NgModule({
  imports: [
    ChartsRoutingModule,
    SharedModule
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule { }
