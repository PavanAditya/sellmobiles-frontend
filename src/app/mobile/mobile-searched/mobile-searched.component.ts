import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { FilterService } from '../../core/services/filter.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { Mobile } from '../../shared/models/mobile.model';
import { User } from '../../shared/models/user.model';
import { MobileService } from '../mobile.service';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mobile-searched',
  templateUrl: './mobile-searched.component.html',
  styleUrls: ['./mobile-searched.component.scss']
})
export class MobileSearchedComponent implements OnInit, OnDestroy {
  public mobileList: Mobile[];
  public subscription = new Subscription();
  public user: User;
  public userName: string;
  public location: string;
  public brand: string;
  public userIsAuthenticated = false;
  public showSpinner = true;
  public cardClass = 'show';
  public cardText = 'favorite_border';
  private authListenerSub = new Subscription();

  constructor(
    private snackBarService: SnackbarService,
    private searchService: SearchService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private mobileService: MobileService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.isLoggedIn();
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.route.queryParamMap.subscribe(param => {
      this.location = param.get('location');
      this.brand = param.get('brand');
      if (!this.brand) {
        if (this.location !== null) {
          this.fetchFilterMobilesByLocation(this.location);
        }
      } else {
        this.fetchFilterMobilesByBrand(this.location, this.brand);
      }
    });

    this.searchService.updateData.subscribe((response) => {
      if (response !== null) {
        if (response.hasOwnProperty('data')) {
          this.mobileList = [...response[`data`]];
          this.mobileList = this.mobileService.checkBuyerName(this.mobileList);
          if (!this.mobileList[0]) {
            this.snackBarService.openSnackBar('No Mobile Found', 'red-snackbar');
          }
        }
      }
      this.showSpinner = false;
    });

    this.filterService.searchFilterData.subscribe((response) => {
      if (response !== null) {
        if (response.hasOwnProperty('data')) {
          this.mobileList = [...response[`data`]];
          this.mobileList = this.mobileService.checkBuyerName(this.mobileList);
          if (!this.mobileList[0]) {
            this.snackBarService.openSnackBar('No Mobile Found', 'red-snackbar');
          }
        }
      }
      this.showSpinner = false;
    });
    this.searchService.clearSearch.subscribe((res) => {
      if (res) {
        this.showSpinner = true;
      }
    });
    this.authListenerSub = this.authService
      .authStatusListener()
      .subscribe(response => {
        this.userIsAuthenticated = response;
      });

    this.userName = localStorage.getItem('token');
    let user = [];
    this.userService.userDetails(this.userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        user = [...response[`data`]];
      }
      this.user = user[0];
    });
  }

  public fetchFilterMobilesByLocation(location: string): void {
    const searchQuery = [location, ''];
    this.searchService.fetchResultList(searchQuery).subscribe((res) => {
      this.searchService.updateData.next(res);
    });
  }

  public fetchFilterMobilesByBrand(location: string, brand: string): void {
    const searchQuery = [location, brand];
    this.searchService.fetchResultList(searchQuery).subscribe((res) => {
      this.searchService.updateData.next(res);
    });
  }

  public showSnackbar(): void {
    this.snackBarService.openSnackBar('Please Login', 'red-snackbar');
  }

  public showFilter(): void {
    this.dialog.open(FilterComponent, {
      height: '630px',
      width: '300px'
    });
  }

  public disableBackground(): string {
    if (this.showSpinner) {
      return 'overlay';
    } else {
      return '';
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
    this.mobileService.updateLike(mobile).subscribe();
  }

  public routerNavigate(uri: string) {
    this.router.navigate([uri]);
  }

  // ?mobile description
  public viewMobile(mobile): void {
    this.router.navigate(['mobile/mobiledetails'],
      { queryParams: { id: mobile._id } });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
