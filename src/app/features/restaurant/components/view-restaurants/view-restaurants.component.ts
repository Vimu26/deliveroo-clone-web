import { Component, OnInit } from '@angular/core'
import { RestaurantService } from '../../service/restaurant.service'
import { HttpParams } from '@angular/common/http'
import { IRestaurant } from 'src/app/interfaces'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-view-restaurants',
  templateUrl: './view-restaurants.component.html',
  styleUrls: ['./view-restaurants.component.scss'],
})
export class ViewRestaurantsComponent implements OnInit {
  isLoading: Boolean = false
  restaurantList: IRestaurant[] = []
  page = 1
  limit = 10

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) {}

  filtersFormGroup = new FormGroup({
    name: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
    rating: new FormControl(0),
    deliveryFee: new FormControl(0),
    distance: new FormControl(''),
  })

  ngOnInit() {
    this.getAllRestaurants()
  }

  async getAllRestaurants() {
    this.isLoading = true
    let params = new HttpParams()
    if (this.filtersFormGroup.controls.name.value) {
      params = params.append(
        'restaurant_name',
        this.filtersFormGroup.controls.name.value,
      )
    }
    if (this.filtersFormGroup.controls.rating.value) {
      params = params.append(
        'rating',
        Number(this.filtersFormGroup.controls.rating.value),
      )
    }
    if (this.filtersFormGroup.controls.minPrice.value) {
      params = params.append(
        'minimum_price',
        this.filtersFormGroup.controls.minPrice.value,
      )
    }
    if (this.filtersFormGroup.controls.maxPrice.value) {
      params = params.append(
        'maximum_price',
        this.filtersFormGroup.controls.maxPrice.value,
      )
    }
    if (this.filtersFormGroup.controls.deliveryFee.value) {
      params = params.append(
        'delivery_fee',
        this.filtersFormGroup.controls.deliveryFee.value,
      )
    }
    if (this.filtersFormGroup.controls.distance.value) {
      params = params.append(
        'distance',
        this.filtersFormGroup.controls.distance.value,
      )
    }
    params = params.append('page', this.page)
    params = params.append('limit', this.limit)
    this.restaurantService.getAllRestaurants(params).subscribe({
      next: (res) => {
        this.restaurantList = res.data
        //MOCK DATA
        // this.restaurantList = Array.from({ length: 10 }, () => ({
        //   name: 'Mock Restaurant',
        //   _id: Math.random().toString(36).substr(2, 9),
        //   rating: Math.floor(Math.random() * 5) + 1,
        //   email: '',
        //   contact_number: '',
        //   location: '',
        //   distance: (Math.random() * 10).toFixed(2),
        //   opens_at: '',
        //   closes_at: '',
        //   minimumPrice: (Math.random() * 10).toFixed(2),
        //   deliveryFee: Math.floor(Math.random() * 20) + 1,
        //   delivery_time: {
        //     from: 0,
        //     to: 0,
        //   },
        //   tagList: [],
        //   image: 'https://inrestoblog.s3.ap-south-1.amazonaws.com/types1.png',
        // }))
      },
      error: (err) => {
        //
      },
    })
  }

  onFilter() {
    this.restaurantList = []
    this.getAllRestaurants()
  }
  onReset() {
    this.filtersFormGroup.reset()
  }

  onRestaurantClick(id: string, index: number) {
    this.restaurantService.setRestaurantId(id)
    this.router.navigate([`/menu/${id}`])
  }
}
