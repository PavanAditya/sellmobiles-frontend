import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MobileComponent } from './mobile.component';
import { MobileUploadComponent } from './mobile-upload/mobile-upload.component';
import { MobileSearchedComponent } from './mobile-searched/mobile-searched.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { MobileWishlistComponent } from './mobile-wishlist/mobile-wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [
      {
        path: 'mobileupload',
        component: MobileUploadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mobilesearched',
        component: MobileSearchedComponent,
        children: [
          { path: 'filter', component: FilterComponent },
          { path: '', component: FilterComponent }
        ]
      },
      {
        path: 'mobiledetails',
        component: MobileDetailComponent
      },
      {
        path: 'wishlist',
        component: MobileWishlistComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
