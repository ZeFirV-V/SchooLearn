import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {IAuthUser} from "../../services/auth/auth-response.interface";

@Component({
  selector: "registration-page",
  templateUrl: "registration.page.web.html",
  styleUrls: ["registration.page.web.scss"]
})
export class RegistrationPageWeb implements OnDestroy, OnInit {
  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        // Теперь вы можете войти в систему используя свои данные
      } else if (params['accessDenied']) {
        // Для начала авторизуйтесь в систему
      }
    })
  }

  public registrationForm: FormGroup = new FormGroup({
    userName: new FormControl("Ученик", Validators.required),
    userEmail: new FormControl("Почта", [Validators.required, Validators.email]),
    userPassword: new FormControl("Пароль", [Validators.required, Validators.minLength(7)]),
    userPhone: new FormControl("Телефон", [Validators.required, Validators.pattern("[0-9]{10}")]), //использует регулярные выражения
  });

  private _authServiceSubscribe: Subscription = new Subscription(); //TODO: переделать без объявления

  public onSubmitRegistration() {
    const data: IAuthUser = {
      name: this.registrationForm.controls["userName"].value,
      email: this.registrationForm.controls["userEmail"].value,
      password: this.registrationForm.controls["userPassword"].value,
      phone: this.registrationForm.controls["userPhone"].value,
      returnSecureToken: true,
    }
    this.registrationForm.disable();
    this._authServiceSubscribe = this._authService.register(data).subscribe(
      (value) => {
        alert("Успешная авторизация");
        this._router.navigate(['/authorization'], {
          queryParams: {
            registered: true,
          }
        }); // переход на authorization
      },
      (error) => {
        alert("Ошибка авторизации");
        console.log(error);
        this.registrationForm.enable();
      },
    ); // можно использовать "this.authorizationForm.value", но смотри за названиями
    // this.users.push(data) // для записи в список, для наглядности
  }

  ngOnDestroy(): void {
    console.log(this._authServiceSubscribe);
    if(this._authServiceSubscribe)
      this._authServiceSubscribe.unsubscribe();
  }
}
