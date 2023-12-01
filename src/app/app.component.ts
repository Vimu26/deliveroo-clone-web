import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'deliveroo-clone-web';
  showFiller = false;
  sidenav: any;
  isNotFoundRoute = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
        this.isNotFoundRoute = currentRoute === '**';
      }
    });
  }

  isLoggedIn(): boolean {
    return !(
      this.router.url.includes('/login') ||
      this.router.url.includes('/register') ||
      this.router.url.includes('/menu')
    );
  }
}
