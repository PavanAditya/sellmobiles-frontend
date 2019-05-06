import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MobileModule } from './mobile/mobile.module';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SideNavComponent,
        HeaderComponent,
        FooterComponent
      ],
      imports: [SharedModule,
        MobileModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule
      ],
      providers: []
    });
  });
  it('should create the app compnent', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponet = fixture.debugElement.componentInstance;
    expect(appComponet).toBeTruthy();
  }));
});
