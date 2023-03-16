import { Component } from "@angular/core";
import {IUser, User} from "../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-authorizationForm",
  templateUrl: "./authorizationForm.component.html",
  styleUrls: ["authorizationForm.component.scss"]
})
export class AuthorizationFormComponent {
  public users: User[] = [];
  public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("Ученик", Validators.required),
    userEmail: new FormControl("Почта", [Validators.required, Validators.email]),
    userPassword: new FormControl("Пароль", Validators.required),
    userPhone: new FormControl("Телефон", [Validators.required, Validators.pattern("[0-9]{10}")]), //использует регулярные выражения
  });

  public onSubmit() {
    const data: IUser = {
      name: this.authorizationForm.controls["userName"].value,
      email: this.authorizationForm.controls["userEmail"].value,
      password: this.authorizationForm.controls["userPassword"].value,
      phone: this.authorizationForm.controls["userPhone"].value,
    }

    this.users.push(data)
  }
}


