import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { CountoModule } from 'angular2-counto';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FilterComponent } from './components/filter/filter.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { ShadowDirective } from './directives/shadow.directive';
import { HelloGreetingPipe } from './pipes/hello-greeting.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProfileDeleteConfirmationComponent } from './components/profile-delete-confirmation/profile-delete-confirmation.component';

@NgModule({
  declarations: [
    FilterComponent,
    ErrorHandlerComponent,
    ShadowDirective,
    HelloGreetingPipe,
    SpinnerComponent,
    ConfirmationComponent,
    ProfileDeleteConfirmationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    CountoModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    Ng2Charts,
    CountoModule,
    FilterComponent,
    ShadowDirective,
    HelloGreetingPipe,
    SpinnerComponent,
    ConfirmationComponent
  ],
  entryComponents: [
    ErrorHandlerComponent,
    ConfirmationComponent,
    ProfileDeleteConfirmationComponent
  ]
})
export class SharedModule { }
