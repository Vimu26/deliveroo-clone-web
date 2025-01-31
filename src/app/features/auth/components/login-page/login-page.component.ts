import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  emailLogin() {
    this.router.navigate(['/auth/login-email'])
  }

  onClickFaceBook(){
    //
  }

  onClickApple(){
    //
  }

  onClickGoogle(){
    //
  }
}
