import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataService } from '../service/login-data.component.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
})
export class EmailLoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router,
    private loginDataService: LoginDataService
  ) {}

  onClickContinue() {
    const email = this.email.value;
    if (email) {
      this.loginDataService.setEmail(email);
      this.router.navigate(['register']);
    }
  }
}
