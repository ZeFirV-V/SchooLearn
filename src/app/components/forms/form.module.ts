import { NgModule } from "@angular/core";
import {AuthorizationFormComponent} from "./authorizationForm/authorizationForm.component";
import {RegistrationFormComponent} from "./registrationForm/registrationForm.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service"; // Для авторизации

@NgModule({
  declarations: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    HttpClientModule, // Для авторизации
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  exports: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
  ],
  providers: [AuthService],
})
export class MyFormsModule {}
