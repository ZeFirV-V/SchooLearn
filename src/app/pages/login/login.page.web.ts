import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IAuthUser} from "../../services/auth/auth-response.interface";

@Component({
  selector: "login-office",
  templateUrl: "login.page.web.html",
  styleUrls: ["login.page.web.scss"]
})
export class LoginPageWeb implements OnDestroy, OnInit {
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

  public authorizationForm: FormGroup = new FormGroup({
    userName: new FormControl("Ученик", Validators.required),
    userEmail: new FormControl("Почта", [Validators.required, Validators.email]),
    userPassword: new FormControl("Пароль", [Validators.required, Validators.minLength(7)]),
    userPhone: new FormControl("Телефон", [Validators.required, Validators.pattern("[0-9]{10}")]), //использует регулярные выражения
  });

  private _asyncSubscribe: Subscription = new Subscription(); //TODO: переделать без объявления

  public onSubmitLogin() {
    const data: IAuthUser = {
      name: this.authorizationForm.controls["userName"].value,
      email: this.authorizationForm.controls["userEmail"].value,
      password: this.authorizationForm.controls["userPassword"].value,
      phone: this.authorizationForm.controls["userPhone"].value,
      returnSecureToken: true,
    }
    this.authorizationForm.disable();
    this._asyncSubscribe = this._authService.login(data).subscribe({
      next: (value) => {
        console.log("Успешная авторизация");
        this._router.navigate(['/lk']).then(); // переход на лк
      },

      error: (error) => {
        console.error("Ошибка авторизации");
        console.log(error);
        this.authorizationForm.enable();
      },
    }); // можно использовать "this.authorizationForm.value", но смотри за названиями
    // this.users.push(data) // для записи в список, для наглядности
    // next(x) {
    //     console.log('got value ' + x);
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   complete() {
    //     console.log('done');
    //   },
  }

  ngOnDestroy(): void {
    if(this._asyncSubscribe)
      this._asyncSubscribe.unsubscribe();
  }
}
