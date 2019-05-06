import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedMobilesComponent } from './uploaded-mobiles.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthGuard } from '../../core/guards/auth.guard';

describe('UploadedMobilesComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedMobilesComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [UserService, AuthGuard]
    });
  });

  it('Mobile Component should be created', () => {
    const fixture = TestBed.createComponent(UploadedMobilesComponent);
    const uploadedMobileComp = fixture.debugElement.componentInstance;
    expect(uploadedMobileComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(UploadedMobilesComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should render title in a p tag', async(() => {
    const fixture = TestBed.createComponent(UploadedMobilesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Uploaded Mobiles');
  }));
  it('should render title in a p tag', async(() => {
    const fixture = TestBed.createComponent(UploadedMobilesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain('UploadedMobiles');
  }));
});
