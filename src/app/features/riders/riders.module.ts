import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RidersRoutingModule } from './riders-routing.module'
import { AddEditRidersComponent } from './add-edit-riders/add-edit-riders.component'

@NgModule({
  declarations: [AddEditRidersComponent],
  imports: [CommonModule, RidersRoutingModule],
})
export class RidersModule {}
