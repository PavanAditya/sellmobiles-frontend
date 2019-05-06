import { Component, OnInit } from '@angular/core';
import { MobileService } from '../mobile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { UserService } from '../../core/services/user.service';
import { Mobile } from '../../shared/models/mobile.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.scss']
})
export class MobileListComponent implements OnInit {
  public mobilesList: Mobile[];
  public user: User;
  public userName: string;
  public userIsAuthenticated = false;
  public cardClass = 'show';
  public cardText = 'favorite_border';
  public showSpinner = true;
  private authListenerSub = new Subscription();


  constructor(
    private mobileservice: MobileService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.authListenerSub = this.authService.authStatusListener().subscribe((response) => {
      this.userIsAuthenticated = response;
    });

    this.mobileservice.updateMobileList.subscribe((res) => {
      if (res) {
        this.fetchMobilesList();
      }
    });
    const token = this.route.queryParams[`value`].authtoken;
    if (token !== undefined) {
      this.authService.thirdParty = true;
      localStorage.setItem('token', token);
    }
    this.fetchUserDetails();
    this.fetchMobilesList();
    this.authService.autoAuthUser();
  }

  public fetchUserDetails(): void {
    this.userName = localStorage.getItem('token');
    let user = [];
    this.userService.userDetails(this.userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        user = [...response[`data`]];
      }
      this.user = user[0];
    });
  }

  public fetchMobilesList(): void {
    this.mobileservice.mobilesList()
      .subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          this.mobilesList = [...response[`data`]];
        }
        this.mobilesList = this.mobileservice.checkBuyerName(this.mobilesList);
        this.showSpinner = false;
      });
  }

  public stickyFooter(): string {
    if (this.showSpinner) {
      return 'sticky';
    } else {
      return 'banner';
    }
  }
  public like(mobile: Mobile): void {
    if (this.cardClass === 'show') {
      this.cardClass = 'show icon';
      mobile.likedBy.push(this.user.email);
      this.updateLikeStatus(mobile);

    } else {
      this.cardClass = 'show';
      mobile.likedBy = mobile.likedBy.filter(element => {
        if (element !== this.user.email) {
          return element;
        }
      });
      this.updateLikeStatus(mobile);
    }
  }

  public disableBackground(): string {
    if (this.showSpinner) {
      return 'overlay';
    } else {
      return 'container';
    }
  }
  public showSnackbar(): void {
    this.snackbarService.openSnackBar('Please Login', 'red-snackbar');
  }

  public isAuthorized(): boolean {
    if (this.userIsAuthenticated) {
      return true;
    } else {
      return false;
    }
  }

  public toggleLikeClass(mobile: Mobile): string {
    if (this.user) {
      if (mobile.likedBy.includes(this.user.email)) {
        this.cardText = 'favorite';
        return 'show icon';
      } else {
        this.cardText = 'favorite_border';
        return 'show';
      }
    } else {
      this.cardText = 'favorite_border';
      return 'show';
    }
  }

  public toggleToolTip(): string {
    if (this.cardText === 'favorite_border') {
      return 'Add to wishlist';
    } else {
      return 'Remove from wishlist';
    }
  }

  public updateLikeStatus(mobile: Mobile): void {
    this.mobileservice.updateLike(mobile).subscribe();
  }

  public routerNavigate(uri: string): void {
    this.router.navigate([uri]);
  }

  // ?mobile description
  public viewMobile(mobile): void {
    this.router.navigate(['mobile/mobiledetails'],
      { queryParams: { id: mobile._id } });
  }
}
