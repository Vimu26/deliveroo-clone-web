import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RestaurantRoutingModule } from './restaurant-routing.module'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/material.module'
import { AddEditRestaurantComponent } from './components/add-edit-restaurant/add-edit-restaurant.component'
import { DishesComponent } from './components/add-edit-restaurant/sections/dishes/dishes.component'
import { DishCategoriesComponent } from './components/add-edit-restaurant/sections/dish-categories/dish-categories.component'
import { RestaurantDetailsComponent } from './components/add-edit-restaurant/sections/restaurant-details/restaurant-details.component'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  declarations: [
    RestaurantComponent,
    AddEditRestaurantComponent,
    RestaurantDetailsComponent,
    DishCategoriesComponent,
    DishesComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class RestaurantModule {}
