import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { Mobile } from '../../shared/models/mobile.model';
import { User } from '../../shared/models/user.model';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-mobile-wishlist',
  templateUrl: './mobile-wishlist.component.html',
  styleUrls: ['./mobile-wishlist.component.scss']
})

export class MobileWishlistComponent implements OnInit {
  public mobilesList: Mobile[];
  public user: User;
  public userName: string;
  public userIsAuthenticated = true;
  public likedMobilesPresent = true;
  public showSpinner = true;
  public cardClass = 'show icon';
  public cardText = 'favorite_border';
  private authListenerSub = new Subscription();


  constructor(
    private mobileservice: MobileService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn();
    window.scrollTo(0, 0);
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.authListenerSub = this.authService.authStatusListener().subscribe((response) => {
      this.userIsAuthenticated = response;
    });
    this.userName = localStorage.getItem('token');
    let user = [];
    this.userService.userDetails(this.userName).subscribe((response) => {
      if (response.hasOwnProperty('data')) {
        user = [...response[`data`]];
      }
      this.user = user[0];
      this.likedMobilesByUser();
    });
  }

  public like(mobile: Mobile): void {
      this.cardClass = 'show';
      mobile.likedBy = mobile.likedBy.filter(element => {
        if (element !== this.user.email) {
          return element;
        }
      });
      this.updateLikeStatus(mobile);
  }

  public likedMobilesByUser(): void {
    this.mobileservice.mobilesList()
      .subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          this.likedMobilesPresent = true;
          this.mobilesList = [...response[`data`]];
          this.mobilesList = this.mobileservice.checkBuyerName(this.mobilesList);
          this.filterMobilesList();
        }
        this.showSpinner = false;
      });
  }

  // ! mobile description
  public viewMobile(mobile): void {
    this.router.navigate(['mobile/mobiledetails'],
      { queryParams: { id: mobile._id } });
  }

  public filterMobilesList(): void {
    this.mobilesList = this.mobilesList.filter((mobile) => {
      if (mobile.likedBy.includes(this.user.email)) {
        return mobile;
      }
    });
    this.cardClass = 'show icon';
    if (!this.mobilesList[0]) {
      this.likedMobilesPresent = false;
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

  public disableBackground(): string {
    if (this.showSpinner) {
      return 'overlay';
    } else {
      return '';
    }
  }

  public updateLikeStatus(mobile: Mobile): void {
    this.mobileservice.updateLike(mobile).subscribe((res) => {
      this.likedMobilesByUser();
    });
  }
  public routerNavigate(uri: string): void {
    this.router.navigate([uri]);
  }
}
