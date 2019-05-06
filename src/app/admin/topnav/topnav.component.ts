import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  public pushRightClass: string;

  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
  }

  public isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  public toggleSidebar(): void {
    const dom = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  public onLoggedout(): void {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/admin/login']);
    this.snackBarService.openSnackBar(
      'Logged Out Successfully',
      'green-snackbar'
    );
  }

}
