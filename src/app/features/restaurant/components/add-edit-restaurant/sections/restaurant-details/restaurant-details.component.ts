import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { AddEditRestaurantService } from '../../services/add-edit-restaurant.service'
import { IRestaurantDetails } from 'src/app/interfaces'

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  @Output() onDetailsNext = new EventEmitter<{ data: IRestaurantDetails }>()
  @Input() restaurantDetailsData!: IRestaurantDetails

  constructor(private restaurantDetailsService: AddEditRestaurantService) {}

  restaurantDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    location: new FormControl('', [Validators.required]),
    distance: new FormControl(0, [Validators.required]),
    opensAt: new FormControl('', [Validators.required]),
    closesAt: new FormControl('', [Validators.required]),
    minimumPrice: new FormControl(0, [Validators.required]),
    deliveryFee: new FormControl(0, [Validators.required]),
    deliveryTime: new FormGroup({
      from: new FormControl(0, Validators.required),
      to: new FormControl(0, Validators.required),
    }),
    tagList: new FormArray([new FormControl('', Validators.required)]),
  })

  ngOnInit(): void {
    if (this.restaurantDetailsData !== undefined) {
      for (let i = 1; i < this.restaurantDetailsData.tag_list.length; i++) {
        this.addTag()
      }
      this.restaurantDetailsData.tag_list.forEach((tag, index) => {
         (this.restaurantDetailsForm.get('tagList') as FormArray)
          .at(index)
          .patchValue(tag)
      })

      this.restaurantDetailsForm.patchValue({
        name: this.restaurantDetailsData.name,
        email: this.restaurantDetailsData.email,
        contactNumber: this.restaurantDetailsData.contact_number,
        location: this.restaurantDetailsData.location,
        distance: this.restaurantDetailsData.distance,
        opensAt: this.restaurantDetailsData.opens_at,
        closesAt: this.restaurantDetailsData.closes_at,
        minimumPrice: this.restaurantDetailsData.minimumPrice,
        deliveryFee: this.restaurantDetailsData.deliveryFee,
        deliveryTime: {
          from: this.restaurantDetailsData.delivery_time.from,
          to: this.restaurantDetailsData.delivery_time.to,
        },
      })
    }
  }

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
        this.restaurantDetailsForm?.controls?.minimumPrice?.value ?? 0,
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

    this.restaurantDetailsService
      .checkRestaurantDetails(restaurantDetails)
      .subscribe({
        next: (res: any) => {
          if (res.code === 201)
            this.onDetailsNext.emit({ data: restaurantDetails })
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
