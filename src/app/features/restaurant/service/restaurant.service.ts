import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { CommonResponse, IRestaurant } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurantID = new Subject<string>()
  restaurantIdObserver$ = this.restaurantID.asObservable()

  constructor(private http: HttpClient) {}

  getAllRestaurants(params?: any): Observable<CommonResponse<IRestaurant[]>> {
    const url = 'http://localhost:8080/restaurants/view-restaurants'
    return this.http.get<CommonResponse<IRestaurant[]>>(url, { params })
  }

  setRestaurantId(id: string) {
    this.restaurantID.next(id)
  }
}
