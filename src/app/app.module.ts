import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {SkeletonModule} from "./libraries/skeleton/skeleton.module";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CustomButtonDirective} from "./libraries/custom-button/custom-button.directive";
import {AboutPageWeb} from "./pages/about/about.page.web";
import {FAQPageWeb} from "./pages/FAQ/FAQ.page.web";
import {HomePageWeb} from "./pages/home/home.page.web";
import {RatingPageWeb} from "./pages/rating/rating.page.web";
import {TasksPageWeb} from "./pages/tasks/tasks.page.web";
import {PrivateOfficePageWeb} from "./pages/private-office/private-office.page.web";
import {MyFormsModule} from "./components/forms/form.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CustomButtonDirective,

    AboutPageWeb,
    FAQPageWeb,
    HomePageWeb,
    RatingPageWeb,
    TasksPageWeb,
    PrivateOfficePageWeb,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SkeletonModule,
    MyFormsModule,
  ],
  providers: [],
  exports: [
    CustomButtonDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
