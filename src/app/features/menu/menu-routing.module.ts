import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MenuComponent } from './components/menu-page/menu.component'

const menuRoutes: Routes = [{ path: ':id', component: MenuComponent }]

@NgModule({
  imports: [RouterModule.forChild(menuRoutes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
