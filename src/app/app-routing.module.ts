import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/components/login-page/login-page.component';
import { MainComponent } from './components/main/main.component';
import { EmailLoginComponent } from './features/auth/components/email-login/login-email.component';
import { EmailRegisterComponent } from './features/auth/components/email-register/email-register.component';
import { MenuComponent } from './features/menu/components/menu-page/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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

