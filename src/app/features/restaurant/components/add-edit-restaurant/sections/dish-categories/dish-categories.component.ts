import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-dish-categories',
  templateUrl: './dish-categories.component.html',
  styleUrls: ['./dish-categories.component.scss'],
})
export class DishCategoriesComponent implements OnInit {
  @Input() CategoryData: any
  @Output() onCategoriesNext = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  dishCategoriesForm = new FormGroup({
    name: new FormArray([new FormControl('', Validators.required)]),
  })

  constructor() {}
  ngOnInit(): void {
    console.log(this.CategoryData)
    if (this.CategoryData.name) {
      for (let i = 1; i < this.CategoryData.name.length; i++) {
        this.addDishCategory()
      }
      this.CategoryData.name.forEach((category: any, index: number) => {
        ;(this.dishCategoriesForm.get('name') as FormArray)
          .at(index)
          .patchValue(category)
      })
    }
  }

  onBack() {
    this.onBackClicked.emit(true)
  }
  onNext() {
    console.log(this.dishCategoriesForm.value)
    this.onCategoriesNext.emit({
      data: this.dishCategoriesForm.value,
    })
  }
  get getDishCategoryArray() {
    return this.dishCategoriesForm.get('name') as FormArray
  }

  addDishCategory() {
    this.getDishCategoryArray.push(new FormControl('', Validators.required))
  }

  removeCategory(index: number) {
    if (index !== 0) {
      this.getDishCategoryArray.removeAt(index)
    }
  }
}
