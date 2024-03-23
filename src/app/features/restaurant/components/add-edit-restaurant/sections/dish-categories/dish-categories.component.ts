import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-dish-categories',
  templateUrl: './dish-categories.component.html',
  styleUrls: ['./dish-categories.component.scss'],
})
export class DishCategoriesComponent implements OnInit {
  @Output() onCategoriesNext = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  dishCategoriesForm = new FormGroup({
    name: new FormArray([new FormControl('', Validators.required)]),
  })

  constructor() {}
  ngOnInit(): void {}

  onBack() {
    this.onBackClicked.emit(true)
  }
  onNext() {
    this.onCategoriesNext.emit({
      data: 'string',
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
