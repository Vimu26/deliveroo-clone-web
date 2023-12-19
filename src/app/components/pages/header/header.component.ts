import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter()
  showButton = true
  search = new FormControl('')

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateButtonVisibility()
        this.isHomeRoute()
      })
  }

  goToLoginPage() {
    this.router.navigate(['auth/login'])
  }

  isHomeRoute(): boolean {
    return this.router.url === '/'
  }
  toggle() {
    this.sidenav.emit()
  }
  navigateToHome() {
    this.router.navigate(['/'])
  }

  private updateButtonVisibility() {
    const currentRoute = this.activatedRoute.root.firstChild?.routeConfig?.path
    this.showButton = currentRoute == ''
  }

  isLoggedIn(): boolean {
    return !(
      this.router.url.includes('/login') ||
      this.router.url.includes('/register') ||
      this.router.url.includes('/menu')
    )
  }

  shouldShowFormField(): boolean {
    return this.router.url.includes('/menu')
  }

  onclickCart() {
    //
  }
}
