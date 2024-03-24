import { TestBed } from '@angular/core/testing'

import { AddEditRestaurantService } from './add-edit-restaurant.service'

describe('AddEditRestaurantService', () => {
  let service: AddEditRestaurantService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AddEditRestaurantService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
