import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthGuard } from '../../core/guards/auth.guard';

describe('HistoryComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [UserService, AuthGuard]
    });
  });

  it('history Component should be created', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const historyComp = fixture.debugElement.componentInstance;
    expect(historyComp).toBeTruthy();
  });

  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should render text in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Sold Mobiles');
  }));
  it('should render text in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).not.toContain('SoldMobiles');
  }));
  it('should render text in a th tag', async(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain(' Brand ');
  }));
  it('should render text in a th tag', async(() => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).not.toContain(' Model ');
  }));
});
