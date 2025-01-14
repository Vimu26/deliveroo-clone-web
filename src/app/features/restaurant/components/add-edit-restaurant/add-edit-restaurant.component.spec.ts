import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddEditRestaurantComponent } from './add-edit-restaurant.component'

describe('AddEditRestaurantComponent', () => {
  let component: AddEditRestaurantComponent
  let fixture: ComponentFixture<AddEditRestaurantComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRestaurantComponent],
    })
    fixture = TestBed.createComponent(AddEditRestaurantComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
