import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginDataService } from '../../services/login-data.component.service'
import { IUserLogin } from 'src/app/interfaces'
import { LoginService } from '../../services/login.component.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  isLoading = false
  passwordBeingEdited = false
  hidePassword = true

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private loginService: LoginService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form.controls.password?.valueChanges.subscribe((value) => {
      if (value !== this.form?.controls.password?.value) {
        this.form?.controls.password?.setErrors({ invalidPassword: false })
        this.form?.controls.password?.updateValueAndValidity()
      }
    })
  }

  onClickContinue() {
    this.passwordBeingEdited = false
    if (this.form.controls.email.value && this.form.controls.password.value) {
      const data: IUserLogin = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }
      this.loginDataService.setData(data)
      this.loginService.loginUser(data).subscribe({
        next: (res) => {
          const token = res.data.token
          this.authService.setToken(token)
          this.router.navigate(['menu'])
        },
        error: (error) => {
          if (error.status === 401) {
            this.form.controls.password.setErrors({ invalidPassword: true })
          } else {
            alert('Invalid Credential')
          }
        },
      })
    }
  }
  onClickSignUp() {
    this.isLoading = true
    setTimeout(() => {
      this.router.navigate(['auth/register'])
      this.isLoading = false
    }, 1500)
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }
}
