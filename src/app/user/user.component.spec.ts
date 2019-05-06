import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { AuthGuard } from '../core/guards/auth.guard';

describe('UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [UserService, AuthGuard]
    });
  });

  it('Mobile Component should be created', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComp = fixture.debugElement.componentInstance;
    expect(userComp).toBeTruthy();
  });

  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });

});
