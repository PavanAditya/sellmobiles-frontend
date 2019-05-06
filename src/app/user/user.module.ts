import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { UploadedMobilesComponent } from './uploaded-mobiles/uploaded-mobiles.component';

@NgModule({
  declarations: [UserComponent, ProfileComponent, HistoryComponent, UploadedMobilesComponent],
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  exports: []
})
export class UserModule { }
