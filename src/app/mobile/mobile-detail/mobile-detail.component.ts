import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { MobileService } from '../mobile.service';
import { Mobile } from '../../shared/models/mobile.model';
import { User } from '../../shared/models/user.model';
import { ConfirmationComponent } from '../../shared/components/confirmation/confirmation.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DataShareService } from '../../core/services/data-share.service';
import { mobileInformation } from '../../core/mocks/mobile-information.mock';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.scss']
})
export class MobileDetailComponent implements OnInit {
  @ViewChild('expandedImg') expandedImg: ElementRef;
  public user: User;
  public selectedUser: User;
  public selectedMobile: Mobile;
  public mobile: Mobile;
  public authListenerSub: Subscription;
  public priceForm: FormGroup;
  public userName: string;
  public mobileId: string;
  public url: string[];
  public sellerOrBuyer = false;
  public userIsAuthenticated = false;
  public editToggle = false;
  public mobileInformation = mobileInformation;

  constructor(
    private mobileService: MobileService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dataShareService: DataShareService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.authService.isLoggedIn();
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.route.queryParamMap.subscribe(param => {
      this.mobileId = param.get('id');
      if (this.mobileId !== null) {
        this.mobileDetails(this.mobileId);
      }
    });
    this.priceForm = new FormGroup({
      price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)])
    });

    this.authListenerSub = this.authService
      .authStatusListener()
      .subscribe(response => {
        this.userIsAuthenticated = response;
      });

    if (this.userIsAuthenticated) {
      this.userName = localStorage.getItem('token');
      let user = [];
      this.userService.userDetails(this.userName).subscribe(response => {
        if (response.hasOwnProperty('data')) {
          user = [...response[`data`]];
        }
        this.user = user[0];
        this.isSeller();
      });
    }
  }

  public updatePrice(): void {
    if (this.priceForm.value.price !== '') {
      this.mobileService
        .updatePrice(this.mobileId, this.priceForm.value.price)
        .subscribe(response => {
          if (response.hasOwnProperty('data')) {
            this.selectedMobile.price = response[`data`].price;
          }
        });
    }
    this.editToggle = !this.editToggle;
  }

  public cancelEdit(): void {
    this.priceForm.reset();
    this.editToggle = !this.editToggle;
  }
  public editPrice(): void {
    this.editToggle = !this.editToggle;
  }
  public onDelete(postId): void {
    this.mobileService.mobilePostId.next(postId._id);
    this.dialog.open(ConfirmationComponent, {
      width: '370px'
    });
  }

  public mobileDetails(mobileId: string): void {
    this.mobileService.getMobileDetailsById(mobileId).subscribe((response) => {
      if (response.hasOwnProperty('data')) {
        this.selectedMobile = response[`data`];
        this.url = this.selectedMobile.image;
      }
    });
  }

  public isSeller(): boolean {
    if (this.user) {
      if (this.selectedMobile) {
        if (this.selectedMobile.userName === this.user.userName) {
          return true;
        }
      }
    }
  }

  public chatWithSeller(): void {
    if (this.selectedMobile.userName) {
      let user = [];
      this.userService.userDetailsByUserName(this.selectedMobile.userName).subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          user = [...response[`data`]];
        }
        this.selectedUser = user[0];
        this.selectedUser._id = user[0]._id;
        this.selectedUser.id = user[0]._id;
        this.dataShareService.changeSelectedUser(this.selectedUser);
        this.routerNavigate('/chat');
      });
    } else {
      this.snackBarService.openSnackBar('Seller details Not Found', 'red-snackbar');
    }
  }

  public changeImage(image): void {
    this.expandedImg.nativeElement.src = image.target.src;
  }

  public routerNavigate(uri: string) {
    this.router.navigate([uri]);
  }

  public validate(event): boolean {
    return (event.charCode === 8 || event.charCode === 0)
      ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
