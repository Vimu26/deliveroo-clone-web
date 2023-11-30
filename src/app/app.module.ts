import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main/main.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './First-Page-Footer/footer/footer.component';
import { HeaderComponent } from './Header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EmailLoginComponent } from './login-page/login-email/login-email.component';
import { MainContentComponent } from './main/main/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailRegisterComponent } from './login-page/email-register/email-register.component';
import { LoginUserComponent } from './login-page/login-email/login-user/login-user.component';
import { MenuComponent } from './menu/menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClickDirective } from './custom-directives/click.directive';
import { MenuItemsComponent } from './menu/menu-items/menu-items.component';
import { BasketComponent } from './menu/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    LoginPageComponent,
    EmailLoginComponent,
    MainContentComponent,
    EmailRegisterComponent,
    LoginUserComponent,
    MenuComponent,
    NotFoundComponent,
    ClickDirective,
    MenuItemsComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
