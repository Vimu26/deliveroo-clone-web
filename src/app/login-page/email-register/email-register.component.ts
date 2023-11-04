import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../service/login-data.component.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserData } from 'src/app/interfaces';
import { LoginService } from '../service/login.component.service';

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
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contact_number: [
          '',
          [Validators.required, Validators.pattern('^\\d{10}$')],
        ],
        address: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
      },
      { validator: passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    const email = this.loginDataService.getEmailData();
    console.log(email);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let data : IUserData = {
        first_name: this.registrationForm?.get('firstName')?.value,
        last_name: this.registrationForm?.get('lastName')?.value,
        email: this.registrationForm.get('email')?.value,
        contact_number: this.registrationForm.get('contact_number')?.value,
        address: this.registrationForm.get('address')?.value,
        password: this.registrationForm.get('password')?.value
      }
      this.loginService.createUser(data).subscribe({
        next : (res: any)=>{
          console.log(res);
          this.router.navigate(['']);
        },
        error : ()=>{
          console.error('Error:');
        }
      })
    }
  }
}
