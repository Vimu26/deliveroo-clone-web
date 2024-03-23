import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.scss'],
})
export class AddEditRestaurantComponent implements OnInit {
  isAddRestaurantDetailsSelected = false
  isDishCategoriesSelected = false
  isDishSectionSelected = false

  isAddRestaurantDetailsCompleted = false
  isDishCategoriesCompleted = false
  isDishSectionCompleted = false

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
}
