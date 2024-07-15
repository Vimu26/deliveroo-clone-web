import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { AddEditRestaurantComponent } from './components/add-edit-restaurant/add-edit-restaurant.component'
import { ViewRestaurantsComponent } from './components/view-restaurants/view-restaurants.component'
import { AuthGuard } from '../auth/auth.guard'

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ViewRestaurantsComponent },
  { path: 'create-restaurant', component: AddEditRestaurantComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
