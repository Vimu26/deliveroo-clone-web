import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EmailLoginComponent } from './components/email-login/login-email.component'
import { EmailRegisterComponent } from './components/email-register/email-register.component'
import { LoginPageComponent } from './components/login-page/login-page.component'

const authRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'login-email', component: EmailLoginComponent },
  { path: 'register', component: EmailRegisterComponent },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
