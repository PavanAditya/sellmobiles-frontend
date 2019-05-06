import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { Mobile } from '../../shared/models/mobile.model';

@Component({
  selector: 'app-uploaded-mobiles',
  templateUrl: './uploaded-mobiles.component.html',
  styleUrls: ['./uploaded-mobiles.component.scss']
})
export class UploadedMobilesComponent implements OnInit {
  public soldMobiles: Mobile[];
  public showSpinner = true;
  public soldMobilesPresent = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    window.scrollTo(0, 0);
    this.userService.userDetails(localStorage.getItem('token')).subscribe((response) => {
      if (response.hasOwnProperty('data')) {
        this.userService.user =  response[`data`];
        this.historyOfMobiles();
      }
    });
  }

  private historyOfMobiles() {
    this.userService.soldMobiles(this.userService.user[0].userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.soldMobiles = [...response[`data`]];
        if (this.soldMobiles[0]) {
          this.soldMobiles = this.soldMobiles.filter((mobile) => {
            if (mobile.buyerUserName === '') {
              return mobile;
            }
          });
          if (!this.soldMobiles[0]) {
            this.soldMobilesPresent = false;
          }
        } else {
          this.soldMobilesPresent = false;
        }
      }
      this.showSpinner = false;
    });
  }

  public disableBackground(): string {
    if (this.showSpinner) {
      return 'overlay';
    } else {
      return '';
    }
  }
  // ? mobile description
  public viewMobile(mobile): void {
    this.router.navigate(['mobile/mobiledetails'],
      { queryParams: { id: mobile._id } });
  }
}
