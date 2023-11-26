import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  passwordBeingEdited = false;

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const hasInvalidPassword = control.hasError('invalidPassword');
    return hasInvalidPassword ? { invalidPassword: true } : null;
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.customPasswordValidator,
    ]),
  });

  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private loginService: LoginService
  ) {}

  onClickContinue() {
    this.passwordBeingEdited = false;
    if (this.form.controls.email.value && this.form.controls.password.value) {
      const data: IUserLogin = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      };
      this.loginDataService.setData(data);
      this.loginService.loginUser(data).subscribe({
        next: (res) => {
          const token = res.data.token;
          localStorage.setItem('token', token);
          this.router.navigate(['menu']);
        },
        error: (error) => {
          console.log(error)
          if (error.status === 401) {
            this.form.controls.password.setErrors({ invalidPassword: true });
          } else {
            alert('Invalid Credential');
          }
        },
      });
    }
  }
  onClickSignUp() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['register']);
      this.isLoading = false;
    }, 1500);
  }
  resetPasswordError() {
    this.passwordBeingEdited = true;
    const passwordControl = this.form.controls.password;
    const currentValidators = passwordControl?.validator
      ? [passwordControl?.validator]
      : [];
    const updatedValidators = currentValidators.filter(
      (validator) => validator !== this.customPasswordValidator
    );
    passwordControl?.setValidators(updatedValidators);
    passwordControl?.updateValueAndValidity();
  }
}
