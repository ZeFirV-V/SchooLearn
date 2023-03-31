import { NgModule } from "@angular/core";
import {AboutPageWeb} from "./about/about.page.web";
import {FAQPageWeb} from "./FAQ/FAQ.page.web";
import {HomePageWeb} from "./home/home.page.web";
import {RatingPageWeb} from "./rating/rating.page.web";
import {TasksPageWeb} from "./tasks/tasks.page.web";
import {PrivateOfficePageWeb} from "./private-office/private-office.page.web";
import {RegistrationPageWeb} from "./registration/registration.page.web";
import {LoginPageWeb} from "./login/login.page.web";
import {PageNotFoundPageWeb } from "./404/404.page.web";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    RegistrationPageWeb,
    LoginPageWeb,
    PageNotFoundPageWeb
  ],
  imports: [
    ReactiveFormsModule, // TODO: потом удалить, после СОЗДАНИЯ МОДУЛЯ ДЛЯ ЛОГИНА
    BrowserModule,
    FormsModule,
  ],
  exports: [
    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
    RegistrationPageWeb,
    PageNotFoundPageWeb,
  ]
})
export class PagesModuleWeb {}
