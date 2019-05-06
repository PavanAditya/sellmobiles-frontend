import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Subscription, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { SnackbarService } from '../services/snackbar.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { AuthenticationComponent } from '../auth/authentication/authentication.component';
import { User } from '../../shared/models/user.model';
import { mobileInformation } from '../mocks/mobile-information.mock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSideNav = new EventEmitter<void>();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  // ?Data member to store the city selected in location search field.
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  private authListenerSub = new Subscription();
  public user: User;
  public selectedUser: User;
  public userName: string;
  public token: string;
  public userIsAuthenticated = false;
  public isAuthenticated = false;
  public selectedCity = 'India';
  public selectedBrand = '';
  public mobileInformation = mobileInformation;
  public brandOptions = mobileInformation.brands;
  public cities = mobileInformation.cities;
  constructor(
    private searchService: SearchService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private userService: UserService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.autoComplete();
    this.authService.isLoggedIn();
    this.userIsAuthenticated = this.userService.isUserAuthenticated();
    this.authListenerSub = this.userService
      .authStatusListener()
      .subscribe((response) => {
        this.userIsAuthenticated = response;
      });
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.authListenerSub = this.authService.authStatusListener().subscribe(response => {
      this.userIsAuthenticated = response;
      this.userName = localStorage.getItem('token');
      let user = [];
      const userSubscription = this.userService.userDetails(this.userName).subscribe(res => {
        if (res.hasOwnProperty('data')) {
          user = res[`data`];
        }
        this.user = user[0];
        if (this.user) {
          this.authService.saveAuthData(this.userName, this.user._id);
        }
      });
    });
    this.searchService.clearSearch.subscribe((res) => {
      if (res) {
        this.selectedBrand = '';
      }
    });
  }
  public autoComplete(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterSearch(value))
      );
  }

  public filterSearch(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brandOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  // ? Adding side nav when screen gets shrink.
  public onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  public navigate(): void {
    this.routerNavigate('/');
  }
  public openChat(): void {
    this.routerNavigate('/chat');
  }

  public openMenu(): void {
    this.trigger.openMenu();
  }
  public closeMenu(): void {
    this.trigger.closeMenu();
  }

  // ? Popping out the dialouge box for sign in / sign up.
  public openDialog(): void {
    const dialogReference = this.dialog
      .open(AuthenticationComponent, {
        disableClose: true
      });
    dialogReference.afterClosed().subscribe(() => {
      this.userName = localStorage.getItem('token');
      let user = [];
      const userSubscription = this.userService
        .userDetails(this.userName)
        .subscribe(response => {
          if (response.hasOwnProperty('data')) {
            user = response[`data`];
          }
          this.user = user[0];
        });
    });
  }

  public wishlist(): void {
    this.routerNavigate('mobile/wishlist');
  }

  public logOut(): void {
    this.authService.logOut().subscribe((response) => {
      this.authService.logOutUser();
      this.snackBarService.openSnackBar(
        'Logged out successfully', 'green-snackbar'
      );
      this.routerNavigate('/');
      this.socketService.logout(this.user._id).subscribe((res) => { });
    });

  }



  // ? Function for searching the mobile by location.
  public searchByLocation(): void {
    this.searchService.updateFilterItems.next(true);
    this.searchService.location = this.selectedCity;
    this.selectedBrand = '';
    this.router.navigate(['mobile/mobilesearched/filter'],
      { queryParams: { location: this.selectedCity } });

  }

  // ? Function for searching the mobile by brand name.
  public searchByBrand(brandName: string): void {
    let brandToBeSearch = '';
    brandName = brandName.replace(/^\s+|\s+$/g, '');
    brandName = brandName.replace(/\s\s+/g, ' ');
    const brandArray = brandName.split(' ', 10);
    brandArray.map((element, index) => {
      if (element !== '') {
        const name = element.toLowerCase();
        if (index !== brandArray.length - 1) {
          brandToBeSearch +=
            name.charAt(0).toUpperCase() + name.substring(1) + ' ';
        } else {
          brandToBeSearch += name.charAt(0).toUpperCase() + name.substring(1);
        }
      }
    });
    this.selectedBrand = brandToBeSearch;
    this.searchService.updateFilterItems.next(true);
    this.router.navigate(['mobile/mobilesearched/filter'],
      { queryParams: { location: this.selectedCity, brand: this.selectedBrand } });
  }

  public loadProfile(): void {
    this.routerNavigate('user/profile');
  }

  public history(): void {
    this.routerNavigate('user/history');
  }

  public uploadedMobiles(): void {
    this.routerNavigate('user/uploadedmobiles');
  }
  public addMobile(): void {
    if (this.userIsAuthenticated) {
      this.routerNavigate('mobile/mobileupload');
    } else {
      this.openDialog();
      this.snackBarService.openSnackBar(
        'Sorry You are not logged in. Please Login for posting a mobile', 'red-snackbar'
      );
    }
  }

  public routerNavigate(uri: string): void {
    this.selectedCity = 'India';
    this.selectedBrand = '';
    this.router.navigate([uri]);
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }
}
