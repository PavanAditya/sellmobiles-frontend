import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { UserResponse } from '../../../shared/models/user-response.model';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent implements OnInit {
  public results: Array<UserResponse>;
  public panelOpenState = false;

  constructor(
    private adminService: AdminService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.adminService.updateMobileData.subscribe((res) => {
      if (res) {
        this.getUsers();
      }
    });
  }

  public getUsers(): void {
    this.adminService.userDetails().subscribe((result) => {
      this.results = result.data;
    });
  }

  public deletePost(id: string): void {

    this.adminService.deletePost(id).subscribe((result) => {
      if (result.status === 200) {
        this.adminService.updateMobileData.next(true);
        this.snackBarService.openSnackBar(
          'Mobile Deleted Successfully',
          'green-snackbar'
        );
      } else {
        this.snackBarService.openSnackBar(
          'Sorry. Process cannot be completed',
          'red-snackbar'
        );
      }
    });
  }
}
