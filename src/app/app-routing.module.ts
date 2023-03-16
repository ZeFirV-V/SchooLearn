import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageWeb } from "./pages/home/home.page.web";
import { AboutPageWeb } from "./pages/about/about.page.web";
import { TasksPageWeb } from "./pages/tasks/tasks.page.web";
import { RatingPageWeb } from "./pages/rating/rating.page.web";
import { FAQPageWeb } from "./pages/FAQ/FAQ.page.web";
import {PrivateOfficePageWeb} from "./pages/private-office/private-office.page.web";

const routes: Routes = [
  {path: '', component: HomePageWeb},
  {path: 'about', component: AboutPageWeb},
  {path: 'tasks', component: TasksPageWeb},
  {path: 'rating', component: RatingPageWeb},
  {path: 'FAQ', component: FAQPageWeb},
  {path: 'lk', component: PrivateOfficePageWeb},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
