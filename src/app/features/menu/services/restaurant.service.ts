import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDish, IRestaurant } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  readonly apiURL = 'http://localhost:8080/restaurants/';
  public $restaurantId = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  setRestaurantId(restaurantId: string) {
    this.$restaurantId.next(restaurantId);
  }

  getAllRestaurants(): Observable<IRestaurant[]> {
   return this.http.get<IRestaurant[]>(this.apiURL+'')
  }
}
