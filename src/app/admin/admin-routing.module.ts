import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from '../core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        canActivate: [AdminGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'registered-users',
        loadChildren: () => import('./pages/registered-users/registered-users.module').then(m => m.RegisteredUsersModule),
        canActivate: [AdminGuard]
      }]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminRoutingModule { }
