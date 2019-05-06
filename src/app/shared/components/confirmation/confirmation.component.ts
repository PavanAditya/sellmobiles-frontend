import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MobileService } from '../../../mobile/mobile.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public soldToggle = false;
  public buyerUserNameForm: FormGroup;
  public mobileId: string;
  constructor(
    private mobileService: MobileService,
    private router: Router,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchMobileId();
    this.buyerUserNameForm = new FormGroup({
      buyerUserName: new FormControl('',
        [Validators.pattern('[A-Za-z]+[0-9]+'), Validators.required])
    });
  }

  public fetchMobileId(): void {
    this.mobileService.mobilePostId.subscribe((res) => {
      this.mobileId = res;
    });
  }
  public deleteMobile(): void {
    this.mobileService.deletePost(this.mobileId).subscribe();
    this.mobileService.updateMobileList.next(true);
    this.snackbar.openSnackBar('Mobile Deleted', 'green-snackbar');
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
  public buyerUserName(): void {
    this.mobileService.updateSoldPost(this.mobileId, this.buyerUserNameForm.value.buyerUserName).subscribe();
    this.mobileService.updateMobileList.next(true);
    this.snackbar.openSnackBar('Mobile Sold', 'green-snackbar');
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
  public updateSoldToggle(): void {
    this.soldToggle = !this.soldToggle;
  }
}
