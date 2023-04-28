import { NgModule } from "@angular/core";
import {AboutPageWeb} from "./about/about.page.web";
import {FAQPageWeb} from "./FAQ/FAQ.page.web";
import {HomePageWeb} from "./home/home.page.web";
import {RatingPageWeb} from "./rating/rating.page.web";
import {PrivateOfficePageWeb} from "./private-office/private-office.page.web";
import {RegistrationPageWeb} from "./registration/registration.page.web";
import {LoginPageWeb} from "./login/login.page.web";
import {PageNotFoundPageWeb } from "./not-found/not-found-.page.web";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {SubjectsPageWeb} from "./tasks/childrens/subjects/subjects.page.web";
import {RouterOutlet} from "@angular/router";
import {TasksPageWeb} from "./tasks/childrens/tasks-home/tasks.component";
import {TasksPage} from "./tasks/tasks.page.web";
import {TaskPageWeb} from "./tasks/childrens/subjects/childrens/task/task.page.web";
import {
  Step1RegistrationCompanyFormComponent
} from "./registration/children/registration-organization/children/step1-registration-company-form/step1-registration-company-form.component";
import {
  Step2RegistrationCompanyFormComponent
} from "./registration/children/registration-organization/children/step2-registration-company-form/step2-registration-company-form.component";
import {
  RegistrationCompanyPageComponent
} from "./registration/children/registration-organization/registration-company-page/registration-company-page.component";
import {
  RegistrationStudentComponent
} from "./registration/children/registration-student/registration-student/registration-student.component";
import {
  RegistrationTeacherComponent
} from "./registration/children/registration-teacher/teacher-organization/registration-teacher.component";


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
    PageNotFoundPageWeb,
    SubjectsPageWeb,
    TasksPage,
    TaskPageWeb,
    Step1RegistrationCompanyFormComponent,
    Step2RegistrationCompanyFormComponent,
    RegistrationCompanyPageComponent,
    RegistrationStudentComponent,
    RegistrationTeacherComponent,
  ],
  imports: [
    ReactiveFormsModule, // TODO: потом удалить, после СОЗДАНИЯ МОДУЛЯ ДЛЯ ЛОГИНА
    BrowserModule,
    FormsModule,
    RouterOutlet,
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
    SubjectsPageWeb,
    TaskPageWeb,
  ]
})
export class PagesModuleWeb {}
