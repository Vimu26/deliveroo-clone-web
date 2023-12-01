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
import { DailySpecialsComponent } from './menu/menu-items/daily-specials/daily-specials.component';
import { SaladsComponent } from './menu/menu-items/salads/salads.component';
import { HotPowerBowlsComponent } from './menu/menu-items/hot-power-bowls/hot-power-bowls.component';
import { GymFoodComponent } from './menu/menu-items/gym-food/gym-food.component';
import { BundlesComponent } from './menu/menu-items/bundles/bundles.component';
import { RainbowWrapsComponent } from './menu/menu-items/rainbow-wraps/rainbow-wraps.component';
import { VeganComponent } from './menu/menu-items/vegan/vegan.component';
import { SnacksComponent } from './menu/menu-items/snacks/snacks.component';

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
    DailySpecialsComponent,
    SaladsComponent,
    HotPowerBowlsComponent,
    GymFoodComponent,
    BundlesComponent,
    RainbowWrapsComponent,
    VeganComponent,
    SnacksComponent,
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
