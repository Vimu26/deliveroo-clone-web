import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { AddEditRestaurantComponent } from './components/add-edit-restaurant/add-edit-restaurant.component'

const routes: Routes = [
  { path: '', component: RestaurantComponent },
  { path: 'create-restaurant', component: AddEditRestaurantComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
