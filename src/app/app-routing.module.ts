import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageWeb } from "./pages/home/home.page.web";
import { AboutPageWeb } from "./pages/about/about.page.web";
import { TasksPageWeb } from "./pages/tasks/tasks.page.web";
import { RatingPageWeb } from "./pages/rating/rating.page.web";
import { FAQPageWeb } from "./pages/FAQ/FAQ.page.web";
import {PrivateOfficePageWeb} from "./pages/private-office/private-office.page.web";
import {RegistrationPageWeb} from "./pages/registration/registration.page.web";
import {LoginPageWeb} from "./pages/login/login.page.web";
import {PageNotFoundPageWeb} from "./pages/404/404.page.web";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', component: HomePageWeb},
      {path: 'about', component: AboutPageWeb},
      {path: 'tasks', component: TasksPageWeb},
      {path: 'rating', component: RatingPageWeb},
      {path: 'FAQ', component: FAQPageWeb},
      {path: 'lk', component: PrivateOfficePageWeb},
      {path: 'registration', component: RegistrationPageWeb},
      {path: 'authorization', component: LoginPageWeb},
      {path: '**', component: PageNotFoundPageWeb}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
