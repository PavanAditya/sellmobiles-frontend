import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { Mobile } from '../../shared/models/mobile.model';
import { historyInformation } from '../../core/mocks/history-table.mock';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public boughtMobiles: Mobile[];
  public soldMobiles: Mobile[];
  public boughtMobilesPresent = true;
  public soldMobilesPresent = true;
  public soldColumns: string[];
  public boughtColumns: string[];
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.coloumnInitialisation();
    this.authService.isLoggedIn();
    window.scrollTo(0, 0);
    this.userService.userDetails(localStorage.getItem('token')).subscribe(async (resp) => {
      if (resp.hasOwnProperty('data')) {
        this.userService.user = await resp[`data`];
        this.historyOfMobiles();
      }
    });
  }

  private coloumnInitialisation(): void {
    this.soldColumns = historyInformation.sold;
    this.boughtColumns = historyInformation.bought;
  }

  private historyOfMobiles(): void {
    this.historyoBoughtMobiles();
    this.historyofSoldMobiles();
  }

  private historyofSoldMobiles(): void {
    this.userService.soldMobiles(this.userService.user[0].userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.soldMobiles = [...response[`data`]];
        if (this.soldMobiles[0] !== undefined) {
          this.soldMobiles = this.soldMobiles.filter((mobile) => {
            if (mobile.buyerUserName !== '') {
              return mobile;
            }
          });
          if (this.soldMobiles[0] === undefined) {
            this.soldMobilesPresent = false;
          }
        } else {
          this.soldMobilesPresent = false;
        }
      }
    });
  }

  private historyoBoughtMobiles(): void {
    this.userService.boughtMobiles(this.userService.user[0].userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.boughtMobiles = [...response[`data`]];
        if (!this.boughtMobiles[0]) {
          this.boughtMobilesPresent = false;
        }
      }
    });
  }

}
