import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {InformationRoleButtonsComponent} from "../information-role-buttons/information-role-buttons.component";
import {LoginRegistrationFormComponent} from "../login-registration-form/login-registration-form.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu?: ElementRef;


  nickname: string | undefined = undefined;
  isMenuOpen = false;
  isOpenRegistrationForm: boolean = false;

  constructor(private renderer: Renderer2) {}


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
}
