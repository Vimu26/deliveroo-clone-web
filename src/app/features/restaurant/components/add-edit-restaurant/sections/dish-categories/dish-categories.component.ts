import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { IDishCategory, IDishCategoryDetails } from 'src/app/interfaces'

@Component({
  selector: 'app-dish-categories',
  templateUrl: './dish-categories.component.html',
  styleUrls: ['./dish-categories.component.scss'],
})
export class DishCategoriesComponent implements OnInit {
  @Input() CategoryData: IDishCategoryDetails[] = []
  @Output() onCategoriesNext = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  // dishCategoriesForm = new FormGroup({
  //   name: new FormArray([new FormControl('', Validators.required)]),
  // })

  dishCategoriesForm = new FormGroup({
    category: new FormArray([
      new FormGroup({
        restaurant: new FormControl(''),
        name: new FormControl('', Validators.required),
      }),
    ]),
  })

  constructor() {}
  ngOnInit(): void {
    console.log(this.CategoryData)
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
    console.log(this.dishCategoriesForm.value)
    this.onCategoriesNext.emit({
      data: this.dishCategoriesForm.value.category,
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
