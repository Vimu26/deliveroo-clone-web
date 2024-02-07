import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from 'src/app/material.module'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BasketComponent } from './components/menu-page/basket/basket.component'
import { DishCategoryComponent } from './components/menu-page/dish-category/dish-category.component'
import { DishesComponent } from './components/menu-page/dishes/dishes.component'
import { MenuComponent } from './components/menu-page/menu.component'
import { MenuRoutingModule } from './menu-routing.module'
import { ClickDirective } from 'src/app/directives/click.directive'
import { TruncatePipe } from 'src/app/pipes/truncate.pipe'
import { ViewDishPopupComponent } from './components/menu-page/dishes/view-dish-popup/view-dish-popup.component'

@NgModule({
  declarations: [
    MenuComponent,
    DishesComponent,
    BasketComponent,
    DishCategoryComponent,
    ClickDirective,
    TruncatePipe,
    ViewDishPopupComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class MenuModule {}
