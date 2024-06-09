import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { IDishCategoryDetails } from 'src/app/interfaces'
import { AddEditRestaurantService } from '../../services/add-edit-restaurant.service'
import { ScrollToTopService } from 'src/app/services/scroll-to-top.service'

@Component({
  selector: 'app-dish-categories',
  templateUrl: './dish-categories.component.html',
  styleUrls: ['./dish-categories.component.scss'],
})
export class DishCategoriesComponent implements OnInit {
  @Input() CategoryData: IDishCategoryDetails[] = []
  @Output() onCategoriesNext = new EventEmitter<{
    data: IDishCategoryDetails[]
  }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  dishCategoriesForm = new FormGroup({
    category: new FormArray([
      new FormGroup({
        restaurant: new FormControl(''),
        name: new FormControl('', Validators.required),
      }),
    ]),
  })

  constructor(
    private addEditRestaurantService: AddEditRestaurantService,
    private scrollToTopService: ScrollToTopService,
  ) {}
  ngOnInit(): void {
    this.scrollToTopService.scrollToTop()
    if (this.CategoryData) {
      for (let i = 1; i < this.CategoryData.length; i++) {
        this.addDishCategory()
      }
      this.CategoryData.forEach((category, index) => {
        ;(
          (this.dishCategoriesForm.controls.category as FormArray).at(
            index,
          ) as FormGroup
        ).patchValue({
          restaurant: category.restaurant,
          name: category.name,
        })
      })
    }
  }

  onBack() {
    this.onBackClicked.emit(true)
  }
  onNext() {
    const dishCategories = this.dishCategoriesForm?.value
      ?.category as IDishCategoryDetails[]
    this.addEditRestaurantService
      .checkDishCategoriesDetails(dishCategories)
      .subscribe({
        next: (res) => {
          this.onCategoriesNext.emit({
            data: dishCategories,
          })
        },
        error: (error) => {
          console.log(error)
        },
      })
  }

  get getDishCategoryArray() {
    return this.dishCategoriesForm.controls.category as FormArray
  }

  addDishCategory() {
    this.getDishCategoryArray.push(
      new FormGroup({
        restaurant: new FormControl(''),
        name: new FormControl('', Validators.required),
      }),
    )
  }

  removeCategory(index: number) {
    if (index !== 0) {
      this.getDishCategoryArray.removeAt(index)
    }
  }
}
