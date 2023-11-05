import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataService } from '../service/login-data.component.service';
import { IUserLogin } from 'src/app/interfaces';
import { LoginService } from '../service/login.component.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
})
export class EmailLoginComponent {
  isLoading = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private loginService: LoginService,
  ) {}

  onClickContinue() {
    if (this.email.value && this.password.value) {
      const data: IUserLogin = {
        email: this.email.value,
        password: this.password.value,
      };
      this.loginDataService.setData(data);
      this.loginService.loginUser(data).subscribe({
        next : (res: any)=> {
          console.log(res);
          this.router.navigate([''])
        },
        error : ()=>{
          console.log("error")
        }
      })

    }
  }
  onClickSignUp() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['register']);
      this.isLoading = false;
    }, 500);
  }
}
