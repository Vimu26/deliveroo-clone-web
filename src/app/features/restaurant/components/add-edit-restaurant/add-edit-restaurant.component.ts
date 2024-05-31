import { Component, OnInit, ViewChild } from '@angular/core'
import {
  IDish,
  IDishCategoryDetails,
  IDishData,
  IRestaurantDetails,
} from 'src/app/interfaces'

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
  formData_DishCategories: IDishCategoryDetails[] = []
  formData_dishes: IDishData[] = []

  constructor() {}

  ngOnInit(): void {
    this.isAddRestaurantDetailsSelected = true
  }
  onStepChange(e: any) {
    const selectedIndex = e.selectedIndex
    const previouslySelectedIndex = e.previouslySelectedIndex

    switch (selectedIndex) {
      case 0:
        this.isAddRestaurantDetailsSelected = true
        this.isDishCategoriesCompleted = false
        this.isDishSectionSelected = false
        break
      case 1:
        this.isDishCategoriesSelected = true
        this.isAddRestaurantDetailsSelected = false
        this.isDishSectionSelected = false

        break
      case 2:
        this.isDishSectionSelected = true
        this.isDishCategoriesSelected = false
        this.isAddRestaurantDetailsSelected = false
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
    switch (e) {
      case 1:
        this.isAddRestaurantDetailsCompleted = true
        this.isAddRestaurantDetailsSelected = false
        this.formData_RestaurantDetails = data.data
        this.isDishCategoriesSelected = true
        console.log(this.formData_RestaurantDetails)
        break
      case 2:
        this.isDishCategoriesCompleted = true
        this.isDishCategoriesSelected = false
        this.formData_DishCategories = data.data
        this.isDishSectionSelected = true
        console.log(this.formData_DishCategories)
        break
      case 3:
        this.isDishSectionCompleted = true
        this.isDishSectionSelected = false
        this.formData_dishes = data.data
        console.log(this.formData_dishes)
        break
      default:
        break
    }
    setTimeout(() => {
      this.stepper.next()
    }, 10)
  }

  onBackClicked() {
    this.stepper.previous()
  }
}
