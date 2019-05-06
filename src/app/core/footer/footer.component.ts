import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { footerInformation } from '../mocks/footer-information.mock';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerInformation = footerInformation;
  public footerImages = {
    facebook: 'assets/third-party/facebook.png',
    google: 'assets/third-party/google.png',
    twitter: 'assets/third-party/twitter.png',
    linkedin: 'assets/third-party/linkedin.png'
  };

  constructor(private route: Router) { }

  ngOnInit() {
  }

  // ? Redirecting to contact us component.
  public contactUs(): void {
    this.routerNavigate('/contact');
  }

  // ? REdirecting to about us component.
  public aboutUs(): void {
    this.routerNavigate('/about');
  }

  public routerNavigate(uri: string) {
    this.route.navigate([uri]);
  }

  public home(): void {
    this.routerNavigate('/');
  }

}
