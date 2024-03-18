import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RestaurantRoutingModule } from './restaurant-routing.module'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/material.module'

@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class RestaurantModule {}
