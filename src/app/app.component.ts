import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isAdmin = true;

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((navigationEnd: NavigationEnd) => {
        if (navigationEnd.url === '/admin') {
          this.isAdmin = true;
        } else if (navigationEnd.url === '/admin/login') {
          this.isAdmin = true;
        } else if (navigationEnd.url === '/admin/dashboard') {
          this.isAdmin = true;
        } else if (navigationEnd.url === '/admin/charts') {
          this.isAdmin = true;
        } else if (navigationEnd.url === '/admin/registered-users') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });

    this.service.autoAuthUser();
  }
}
