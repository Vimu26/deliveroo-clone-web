import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonResponse, IRestaurant } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getAllRestaurants(params?: any): Observable<CommonResponse<IRestaurant[]>> {
    const url = 'http://localhost:8080/restaurants/view-restaurants'
    return this.http.get<CommonResponse<IRestaurant[]>>(url, { params })
  }
}
