import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TablesRoutingModule } from './registered-users-routing.module';
import { RegisteredUsersComponent } from './registered-users.component';

@NgModule({
    imports: [
        SharedModule,
        TablesRoutingModule
    ],
    declarations: [RegisteredUsersComponent]
})
export class RegisteredUsersModule { }
