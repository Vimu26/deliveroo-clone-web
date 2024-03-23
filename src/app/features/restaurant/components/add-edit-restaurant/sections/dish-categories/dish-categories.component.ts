import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-dish-categories',
  templateUrl: './dish-categories.component.html',
  styleUrls: ['./dish-categories.component.scss'],
})
export class DishCategoriesComponent implements OnInit {
  @Output() onCategoriesNext = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  constructor() {}
  ngOnInit(): void {}

  onBack() {
    this.onBackClicked.emit(true)
  }
  onNext() {
    console.log('ddvbfdhvs')
    this.onCategoriesNext.emit({
      data: 'string',
    })
  }
}
