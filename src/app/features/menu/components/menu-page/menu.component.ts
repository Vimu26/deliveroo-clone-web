import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurant.service';
import { IRestaurant } from 'src/app/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  restaurantList: IRestaurant[] = [];
  name: string = '';
  location: string = '';
  contact_number: string = '';
  closesAt: string = '';
  distance: string = '';
  minimumPrice: string = '';
  deliveryFee: string = '';
  restaurantId: string = '';

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (res: any) => {
        this.restaurantList.push(...res.data);
        this.name = this.restaurantList[0].name;
        this.location = this.restaurantList[0].location;
        this.contact_number = this.restaurantList[0].contact_number;
        this.closesAt = this.restaurantList[0].closesAt;
        this.distance = this.restaurantList[0].distance;
        this.minimumPrice = this.restaurantList[0].minimumPrice;
        this.deliveryFee = this.restaurantList[0].deliveryFee;
        this.restaurantId = this.restaurantList[0]._id;
        this.restaurantsService.setRestaurantId(this.restaurantId);
      },
      error: () => {
        //
      },
    });
  }
}
