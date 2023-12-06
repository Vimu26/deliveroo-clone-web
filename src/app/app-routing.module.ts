import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainComponent } from './main/main/main.component';
import { EmailLoginComponent } from './login-page/login-email/login-email.component';
import { EmailRegisterComponent } from './login-page/email-register/email-register.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

// auth module
// auth module routes
// auth/ - select the login type
// auth/register
// auth/login - email and password

// menu module
// menu module routes
// menu/  - menu

// menu module

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'login-email', component: EmailLoginComponent },
  { path: 'register', component: EmailRegisterComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// export const routingComponents = [MainComponent,LoginPageComponent]
