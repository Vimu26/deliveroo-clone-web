import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'deliveroo-clone-web';
  showFiller = false;
  sidenav: any;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !(
      this.router.url.includes('/login') ||
      this.router.url.includes('/register') ||
      this.router.url.includes('/menu')
    );
  }
}
