import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { RestaurantsService } from '../../services/restaurant.service'
import { IRestaurant } from 'src/app/interfaces'
import { Subject, Subscription, takeUntil } from 'rxjs'
import { RestaurantService } from 'src/app/features/restaurant/service/restaurant.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  RESTAURANT_ID!: string
  restaurantList: IRestaurant[] = []
  selectedRestaurant: IRestaurant = {
    _id: '',
    name: '',
    location: '',
    distance: '',
    minimumPrice: '',
    deliveryFee: 0,
    delivery_time: { from: 0, to: 0 },
    opens_at: '',
    closes_at: '',
    email: '',
    contact_number: '',
    tagList: [],
    rating: 0,
    image: '',
  }
  sticky: boolean = false
  private onDestroyDeposit$ = new Subject()
  isLoading = false

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.scrollY || window.pageYOffset
    if (windowScroll >= 370) {
      this.sticky = true
    } else {
      this.sticky = false
    }
  }

  constructor(
    private restaurantsService: RestaurantsService,
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.RESTAURANT_ID = data['id']
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.getRestaurant(this.RESTAURANT_ID)
    // this.restaurantService.restaurantIdObserver$.subscribe((id) => {
    //   console.log(id);
    //   this.RESTAURANT_ID = id;
    //   console.log(this.RESTAURANT_ID);
    //   this.getRestaurant(this.RESTAURANT_ID);
    // });
  }

  getRestaurant(id: string) {
    this.restaurantsService.getSingleRestaurant(id).subscribe({
      next: (res) => {
        console.log(res.data)
        this.selectedRestaurant = res.data
        console.log(this.selectedRestaurant.name)
        this.isLoading = false
      },
      error: () => {
        //
      },
    })
  }
  ngOnDestroy() {
    this.onDestroyDeposit$.next(null)
    this.onDestroyDeposit$.complete()
  }

  getStatusAndTime(): { status: string; time: string } {
    if (
      this.selectedRestaurant?.opens_at &&
      this.selectedRestaurant?.closes_at
    ) {
      const currentTime = new Date()
      const opensAt = new Date(this.selectedRestaurant?.opens_at)
      const closesAt = new Date(this.selectedRestaurant?.closes_at)

      if (
        currentTime >= new Date(opensAt) &&
        currentTime <= new Date(closesAt)
      ) {
        return { status: 'Closes', time: this.selectedRestaurant?.closes_at }
      } else {
        return { status: 'Opens', time: this.selectedRestaurant?.opens_at }
      }
    }
    return { status: 'Unavailable', time: 'N/A' }
  }
}
