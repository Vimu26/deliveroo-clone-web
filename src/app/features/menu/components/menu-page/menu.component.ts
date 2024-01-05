import { Component, OnInit } from '@angular/core'
import { RestaurantsService } from '../../services/restaurant.service'
import { IRestaurant } from 'src/app/interfaces'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  RESTAURANT_ID: string
  restaurantList: IRestaurant[] = []
  selectedRestaurant: IRestaurant | undefined

  constructor(private restaurantsService: RestaurantsService) {
    this.RESTAURANT_ID = '657efd66af295827d530ef3b'
  }

  ngOnInit() {
    this.getRestaurant(this.RESTAURANT_ID)
  }

  getRestaurant(data: string) {
    this.restaurantsService.getSingleRestaurant(data).subscribe({
      next: (res) => {
        this.selectedRestaurant = res.data
      },
      error: () => {
        //
      },
    })
  }
  getStatusAndTime(): { status: string; time: string } {
    if (
      this.selectedRestaurant?.opens_at &&
      this.selectedRestaurant?.closes_at
    ) {
      const currentTime = new Date()
      const opensAt = new Date(this.selectedRestaurant?.opens_at)
      const closesAt = new Date(this.selectedRestaurant?.closes_at)

      if (currentTime >= opensAt && currentTime <= closesAt) {
        return { status: 'Closes', time: this.selectedRestaurant?.closes_at }
      } else {
        return { status: 'Opens', time: this.selectedRestaurant?.opens_at }
      }
    }
    return { status: 'Unavailable', time: 'N/A' }
  }
}
