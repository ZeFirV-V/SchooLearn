import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CustomButtonDirective} from "./libraries/custom-button/custom-button.directive";
import {PagesModuleWeb} from "./pages/pages.module.web";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./modules/auth/helpers/token.interceptor";
import {fakeBackendProvider} from "./helpers/backend/fake-backend";
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import {LoginRegistrationFormComponent} from "./components/login-registration-form/login-registration-form.component";
import {MatInputModule} from "@angular/material/input";
import { StudentComponent } from './pages/private-office/student/student.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CustomButtonDirective,
    SiteLayoutComponent,
    LoginRegistrationFormComponent,
    StudentComponent,
    SideBarComponent,


  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    PagesModuleWeb,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    // SkeletonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }, //TODO: сделать в дальнейшем отдельный Interceptor для обработки ошибок
    fakeBackendProvider,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: '#D3AAF8' },
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
