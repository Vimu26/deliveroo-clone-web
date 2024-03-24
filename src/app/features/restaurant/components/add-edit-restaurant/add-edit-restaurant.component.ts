import { Component, OnInit, ViewChild } from '@angular/core'
import { MatStepper } from '@angular/material/stepper'
import { IRestaurantDetails } from 'src/app/interfaces'

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.scss'],
})
export class AddEditRestaurantComponent implements OnInit {
  @ViewChild('stepper') stepper: any
  isAddRestaurantDetailsSelected = false
  isDishCategoriesSelected = false
  isDishSectionSelected = false

  isAddRestaurantDetailsCompleted = false
  isDishCategoriesCompleted = false
  isDishSectionCompleted = false

  formData_RestaurantDetails!: IRestaurantDetails
  formData_DishCategories!: string[]
  formData_dishes!: string[]

  constructor() {}

  ngOnInit(): void {
    this.isAddRestaurantDetailsSelected = true
  }
  onStepChange(e: any) {
    console.log(e)
    const selectedIndex = e.selectedIndex
    const previouslySelectedIndex = e.previouslySelectedIndex

    switch (selectedIndex) {
      case 0:
        this.isAddRestaurantDetailsSelected = true
        break
      case 1:
        this.isDishCategoriesSelected = true

        break
      case 2:
        this.isDishSectionSelected = true
        break
      default:
        break
    }

    switch (previouslySelectedIndex) {
      case 0:
        this.isAddRestaurantDetailsSelected = false
        break
      case 1:
        this.isDishCategoriesSelected = false
        break
      case 2:
        this.isDishSectionSelected = false
        break
      default:
        break
    }
  }

  onNextClicked(e: number, data: any) {
    console.log(e, data)
    switch (e) {
      case 1:
        this.isAddRestaurantDetailsCompleted = true
        this.isAddRestaurantDetailsSelected = false
        this.formData_RestaurantDetails = data.data
        break
      case 2:
        this.isDishCategoriesCompleted = true
        this.isDishCategoriesSelected = false
        break
      case 3:
        this.isDishSectionCompleted = true
        this.isDishSectionSelected = false
        break
      default:
        break
    }
    this.stepper.next()
  }

  onBackClicked() {
    this.stepper.previous()
  }
}
