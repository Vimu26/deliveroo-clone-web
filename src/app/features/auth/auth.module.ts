import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { EmailLoginComponent } from './components/email-login/login-email.component'
import { EmailRegisterComponent } from './components/email-register/email-register.component'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { MaterialModule } from 'src/app/material.module'
import { AppModule } from 'src/app/app.module'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    LoginPageComponent,
    EmailLoginComponent,
    EmailRegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
