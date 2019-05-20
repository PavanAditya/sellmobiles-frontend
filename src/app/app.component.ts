import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ChatBotComponent } from './core/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAdmin = true;
  public innerWidth = window.innerWidth;
  public innerHeight = window.innerHeight;

  constructor(
    private service: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
    window.onresize = (e) => {
      // ? ngZone.run will help to run change detection
      this.ngZone.run(() => {
        this.setDimensions();
      });
    };
  }

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

  public chatBotDialog(): void {
    this.dialog.open(ChatBotComponent, {
      disableClose: true
    });
  }

  public setDimensions(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
}
