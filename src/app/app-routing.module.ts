import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './core/auth/authentication/authentication.component';
import { ContactComponent } from './core/contact/contact.component';
import { AboutComponent } from './core/about/about.component';
import { ForgotpasswordComponent } from './core/auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './core/auth/resetpassword/resetpassword.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MobileListComponent } from './mobile/mobile-list/mobile-list.component';

const routes: Routes = [
  // ? Lazy Loaded Modules
  { path: 'mobile', loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  // ? Imported core functionality components
  { path: 'authentication', component: AuthenticationComponent, canActivate: [NoAuthGuard] },
  { path: 'forgotpassword', component: ForgotpasswordComponent, canActivate: [NoAuthGuard] },
  { path: 'resetpassword/:token', component: ResetpasswordComponent, canActivate: [NoAuthGuard] },
  { path: 'mobilelist', component: MobileListComponent, canActivate: [NoAuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [NoAuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [NoAuthGuard] },
  { path: '', component: MobileListComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },

  // ? Redirecting to page not found conponent if wrong address entered by the user.
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
