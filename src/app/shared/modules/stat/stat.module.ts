import { NgModule } from '@angular/core';
import { CountoModule } from 'angular2-counto';
import { StatComponent } from './stat.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    imports: [
        SharedModule,
        CountoModule
      ],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule { }
