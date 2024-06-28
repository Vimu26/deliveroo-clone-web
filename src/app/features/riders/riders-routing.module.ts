import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddEditRidersComponent } from './add-edit-riders/add-edit-riders.component'

const routes: Routes = [
  { path: 'create-riders', component: AddEditRidersComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidersRoutingModule {}
