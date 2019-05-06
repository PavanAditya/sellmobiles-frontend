import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MobileRoutingModule } from './mobile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MobileComponent } from './mobile.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { MobileSearchedComponent } from './mobile-searched/mobile-searched.component';
import { MobileUploadComponent } from './mobile-upload/mobile-upload.component';
import { MobileWishlistComponent } from './mobile-wishlist/mobile-wishlist.component';
import { environment } from '../../environments/environment.prod';

@NgModule({
  declarations: [
    MobileComponent,
    MobileDetailComponent,
    MobileUploadComponent,
    MobileSearchedComponent,
    MobileListComponent,
    MobileWishlistComponent
  ],
  imports: [
    MobileRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [AngularFirestore],
  exports: [MobileListComponent]
})
export class MobileModule { }
