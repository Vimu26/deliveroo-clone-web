import { Component, EventEmitter, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent {
  @Output() onDetailsNext = new EventEmitter<{ data: any }>()

  restaurantDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    location: new FormControl('', [Validators.required]),
    distance: new FormControl('', [Validators.required]),
    opensAt: new FormControl('', [Validators.required]),
    closesAt: new FormControl('', [Validators.required]),
    minimumPrice: new FormControl('', [Validators.required]),
    deliveryFee: new FormControl('', [Validators.required]),
    deliveryTime: new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
    }),
    tagList: new FormArray([new FormControl('', Validators.required)]),
  })

  onCancel() {
    //
  }

  onNext() {
    console.log(this.restaurantDetailsForm.value)
    this.onDetailsNext.emit({ data: this.restaurantDetailsForm.value })
  }

  get tagList() {
    return this.restaurantDetailsForm.get('tagList') as FormArray
  }

  addTag() {
    this.tagList.push(new FormControl('', Validators.required))
  }

  removeTag(index: number) {
    if (index !== 0) {
      this.tagList.removeAt(index)
    }
  }
}
