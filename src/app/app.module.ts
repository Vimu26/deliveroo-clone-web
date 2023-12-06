import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header-component/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from '../../src/app/components/footer/footer.component';
import { LoginPageComponent } from './features/auth/components/login-page/login-page.component';
import { EmailLoginComponent } from './features/auth/components/email-login/login-email.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './features/menu/components/menu-page/menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClickDirective } from './custom-directives/click.directive';
import { MenuItemsComponent } from './features/menu/components/menu-page/dish-items/menu-items.component';
import { BasketComponent } from './features/menu/components/menu-page/basket/basket.component';
import { DishCategoryComponent } from './features/menu/components/menu-page/dish-category/dish-category.component';
import { EmailRegisterComponent } from './features/auth/components/email-register/email-register.component';

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
    MenuComponent,
    NotFoundComponent,
    ClickDirective,
    MenuItemsComponent,
    BasketComponent,
    DishCategoryComponent,
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
