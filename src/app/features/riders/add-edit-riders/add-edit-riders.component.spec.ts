import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddEditRidersComponent } from './add-edit-riders.component'

describe('AddEditRidersComponent', () => {
  let component: AddEditRidersComponent
  let fixture: ComponentFixture<AddEditRidersComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRidersComponent],
    })
    fixture = TestBed.createComponent(AddEditRidersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
