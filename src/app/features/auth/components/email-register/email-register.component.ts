import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../services/login-data.component.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserData } from 'src/app/interfaces';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.component.service';

const passwordMatchValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.scss'],
})
export class EmailRegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private loginDataService: LoginDataService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: [
        '',
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const password = this.registrationForm?.get('password')?.value;
      const confirmPassword =
        this.registrationForm?.get('confirm_password')?.value;
      if (password !== confirmPassword) {
        this.registrationForm
          .get('confirm_password')
          ?.setErrors({ passwordMismatch: true });
        return;
      }
      let data: IUserData = {
        first_name: this.registrationForm?.get('firstName')?.value,
        last_name: this.registrationForm?.get('lastName')?.value,
        email: this.registrationForm.get('email')?.value,
        contact_number: this.registrationForm.get('contact_number')?.value,
        address: this.registrationForm.get('address')?.value,
        password: this.registrationForm.get('password')?.value,
      };
      this.loginService.createUser(data).subscribe({
        next: (res: any) => {
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['login-email']);
          }, 1500);
        },
        error: (err) => {
          console.log(err);
          if (err.status !== 409) {
            console.error('Internal Server Error:');
          }
          this.registrationForm
            .get('email')
            ?.setErrors({ emailConflict: true });
        },
      });
    }
  }
  onCancel() {
   this.router.navigate(['login-email']);
}
}
