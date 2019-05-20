import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// import { environment } from 'src/environments/environment';
import { environment } from '../../environments/environment.prod';
import { DetailsInMobileComponent } from './about/details-in-mobile/details-in-mobile.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';


@NgModule({
  declarations: [
    AboutComponent,
    AuthenticationComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SideNavComponent,
    DetailsInMobileComponent,
    ChatBotComponent
  ],
  imports: [
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports : [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    ChatBotComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.siteKey,
      } as RecaptchaSettings,
    }
  ],
  entryComponents: [
    ChatBotComponent
  ]
})
export class CoreModule { }
