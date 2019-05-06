import { Component, OnInit } from '@angular/core';
import { siteInformation } from '../mocks/about-information.mock';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public siteInformation = siteInformation;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    window.scrollTo(0, 0);
  }
}
