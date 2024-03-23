import { Component, EventEmitter, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { AddEditRestaurantService } from '../../services/add-edit-restaurant.service'
import { IRestaurantDetails } from 'src/app/interfaces'

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent {
  @Output() onDetailsNext = new EventEmitter<{ data: any }>()

  constructor(private restaurantDetailsService: AddEditRestaurantService) {}

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
    const restaurantDetails: IRestaurantDetails = {
      name: this.restaurantDetailsForm?.controls?.name?.value ?? '',
      email: this.restaurantDetailsForm?.controls?.email?.value ?? '',
      contact_number:
        this.restaurantDetailsForm?.controls?.contactNumber?.value ?? '',
      location: this.restaurantDetailsForm?.controls?.location?.value ?? '',
      distance:
        Number(this.restaurantDetailsForm?.controls?.distance?.value) ?? 0,
      opens_at: this.restaurantDetailsForm?.controls?.opensAt?.value ?? '',
      closes_at: this.restaurantDetailsForm?.controls?.closesAt?.value ?? '',
      minimumPrice:
        this.restaurantDetailsForm?.controls?.minimumPrice?.value ?? '',
      deliveryFee:
        Number(this.restaurantDetailsForm?.controls?.deliveryFee?.value) ?? 0,
      delivery_time: {
        from:
          Number(
            this.restaurantDetailsForm?.controls?.deliveryTime?.controls?.from
              ?.value,
          ) ?? 0,
        to:
          Number(
            this.restaurantDetailsForm?.controls?.deliveryTime?.controls?.to
              ?.value,
          ) ?? 0,
      },
      tag_list: this.restaurantDetailsForm?.controls?.tagList?.value?.map(
        (tag) => tag!,
      ),
    }

    console.log(restaurantDetails)
    this.restaurantDetailsService
      .checkRestaurantDetails(restaurantDetails)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          if (res.code === 201)
            this.onDetailsNext.emit({ data: this.restaurantDetailsForm.value })
        },
        error: (error: any) => {
          console.log(error)
        },
      })
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
