import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() dishCategoriesData : any;
  @Output() onDishesCompleted = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {
    console.log(this.dishCategoriesData)
  }

  onNext() {
    // this.onDishesCompleted.emit({
    //   data: '3',
    // })
  }

  onBack() {
    this.onBackClicked.emit(true)
  }
}
