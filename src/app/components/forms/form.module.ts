import { NgModule } from "@angular/core";
import {AuthorizationFormComponent} from "./authorizationForm/authorizationForm.component";
import {RegistrationFormComponent} from "./registrationForm/registrationForm.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@NgModule({
  declarations: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  exports: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
  ]
})
export class MyFormsModule {}
