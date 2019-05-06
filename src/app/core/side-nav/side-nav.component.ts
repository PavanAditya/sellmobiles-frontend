import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { User } from '../../shared/models/user.model';
import { AuthenticationComponent } from '../auth/authentication/authentication.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sideNavigation;

  public userName: string;
  public user: User;
  public userIsAuthenticated = false;
  public subscription: Subscription;
  private authListenerSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.authListenerSub = this.authService
      .authStatusListener()
      .subscribe(response => {
        this.userIsAuthenticated = response;
      });
    this.userName = localStorage.getItem('token');
    let user = [];
    this.userService
      .userDetails(this.userName)
      .subscribe(response => {
        if (response.hasOwnProperty('data')) {
          user = response[`data`];
        }
        this.user = user[0];
      });
  }

  public home(): void {
    this.routerNavigate('');
  }
  public about(): void {
    this.routerNavigate('about');
  }
  public contact(): void {
    this.routerNavigate('contact');
  }
  public chat(): void {
    this.routerNavigate('chat');
  }
  public myProfile(): void {
    this.routerNavigate('user/profile');
  }
  public history(): void {
    this.routerNavigate('user/history');
  }
  public myWishlist(): void {
    this.routerNavigate('mobile/wishlist');
  }
  public addMobile(): void {
    this.routerNavigate('mobile/mobileupload');
  }
  public mobileUploaded(): void {
    this.routerNavigate('user/uploadedmobiles');
  }
  public logOut(): void {
    this.authService.logOut().subscribe((response) => {
      this.authService.logOutUser();
      this.snackBarService.openSnackBar(
        'Logged out successfully', 'green-snackbar'
      );
      this.routerNavigate('/');
    });
  }

  public closeSideNav(): void {
    this.sideNavigation.close();
  }

  public openDialog(): void {
    const dialogReference = this.dialog.open(AuthenticationComponent, {
      width: '470px',
      height: '500px',
      disableClose: true
    });
    this.subscription = dialogReference.afterClosed().subscribe();
  }

  public routerNavigate(uri: string): void {
    this.router.navigate([uri]);
  }
}
