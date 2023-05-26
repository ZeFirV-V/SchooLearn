import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {InformationRoleButtonsComponent} from "../information-role-buttons/information-role-buttons.component";
import {LoginRegistrationFormComponent} from "../login-registration-form/login-registration-form.component";
import {AuthService} from "../../modules/auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu?: ElementRef;

  isEntered: boolean = false;
  nickname: string | undefined = undefined;
  isMenuOpen = false;
  isOpenRegistrationForm: boolean = false;

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit() {
    this.isEntered = this.authService.isAuthenticated();
  }
  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target !== this.toggleButton.nativeElement
        && this.menu
        && target !== this.menu.nativeElement
        && !this.menu.nativeElement.contains(target)
        && !target.closest('app-login-registration-form')
        && !this.isOpenRegistrationForm
      ) {
        this.isMenuOpen = false;
      }
    });
  }

  openRegistrationChanged() {
    this.isOpenRegistrationForm = true;
    setTimeout(() => {
      this.isOpenRegistrationForm = false;
    }, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogin(isLogin: boolean) {
    if(isLogin) {
      this.isEntered = true;
    } else {
      alert("Вы не авторизованы")
    }
  }

  exit() {
    this.authService.logout()
    this.isEntered = false;
  }
}
