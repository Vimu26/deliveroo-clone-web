import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() dishCategoriesData : any;
  @Output() onDishesCompleted = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()

  dishFormGroup = new FormGroup({
    dish: new FormArray([
      new FormGroup({
        dishCategory : new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        image: new FormControl('', Validators.required),
        calories: new FormControl(0, Validators.required),
        addons: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            checked: new FormControl(false)
          })
        ]),
        size: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
          })
        ])   
      })
    ])
  })

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
