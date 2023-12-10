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
import { NewDailySpecialsComponent } from './features/menu/components/menu-page/dish-items/new-daily-specials/new-daily-specials.component';
import { SaladsComponent } from './features/menu/components/menu-page/dish-items/salads/salads.component';
import { HotPowerBowlsComponent } from './features/menu/components/menu-page/dish-items/hot-power-bowls/hot-power-bowls.component';
import { GymFoodComponent } from './features/menu/components/menu-page/dish-items/gym-food/gym-food.component';
import { BundlesComponent } from './features/menu/components/menu-page/dish-items/bundles/bundles.component';
import { RainbowWrapsComponent } from './features/menu/components/menu-page/dish-items/rainbow-wraps/rainbow-wraps.component';
import { VeganMenuComponent } from './features/menu/components/menu-page/dish-items/vegan-menu/vegan-menu.component';
import { SnacksSidesComponent } from './features/menu/components/menu-page/dish-items/snacks-sides/snacks-sides.component';
import { YoghurtFruitsComponent } from './features/menu/components/menu-page/dish-items/yoghurt-fruits/yoghurt-fruits.component';
import { ColdDrinksComponent } from './features/menu/components/menu-page/dish-items/cold-drinks/cold-drinks.component';
import { SmoothiesShakesJuiceComponent } from './features/menu/components/menu-page/dish-items/smoothies-shakes-juice/smoothies-shakes-juice.component';

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
    NewDailySpecialsComponent,
    SaladsComponent,
    HotPowerBowlsComponent,
    GymFoodComponent,
    BundlesComponent,
    RainbowWrapsComponent,
    VeganMenuComponent,
    SnacksSidesComponent,
    YoghurtFruitsComponent,
    ColdDrinksComponent,
    SmoothiesShakesJuiceComponent,
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
