import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { AddEditRestaurantComponent } from './components/add-edit-restaurant/add-edit-restaurant.component'
import { ViewRestaurantsComponent } from './components/view-restaurants/view-restaurants.component'

const routes: Routes = [
  { path: '', component: ViewRestaurantsComponent },
  { path: 'create-restaurant', component: AddEditRestaurantComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
