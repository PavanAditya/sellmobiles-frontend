import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { HistoryComponent } from './history/history.component';
import { UploadedMobilesComponent } from './uploaded-mobiles/uploaded-mobiles.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'uploadedmobiles', component: UploadedMobilesComponent },
      { path: '', component: ProfileComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
