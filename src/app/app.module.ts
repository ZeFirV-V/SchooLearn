import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule } from "@angular/forms";
// import {SkeletonModule} from "./libraries/skeleton/skeleton.module";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CustomButtonDirective} from "./libraries/custom-button/custom-button.directive";
import {MyFormsModule} from "./components/forms/form.module";
import {PagesModuleWeb} from "./pages/pages.module.web";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CustomButtonDirective,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    PagesModuleWeb,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // SkeletonModule,
    MyFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
