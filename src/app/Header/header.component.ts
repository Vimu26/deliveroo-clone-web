import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) {}


  goToLoginPage(){
    this.router.navigate(['/login']);
  }
  toggle(){
    this.sidenav.emit()
  }
}
