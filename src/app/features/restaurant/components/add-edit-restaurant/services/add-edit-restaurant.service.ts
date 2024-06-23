import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  CommonCheckResponse,
  CommonResponse,
  IDish,
  IDishCategory,
  IDishCategoryDetails,
  IDishData,
  IDishRequest,
  IDishResponse,
  IRestaurantDetails,
} from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class AddEditRestaurantService {
  constructor(private http: HttpClient) {}

  checkRestaurantDetails(
    data: IRestaurantDetails,
  ): Observable<CommonCheckResponse> {
    const url = 'http://localhost:8080/restaurants/check-restaurant-details'
    return this.http.post<CommonCheckResponse>(url + '', data)
  }

  checkDishCategoriesDetails(
    data: IDishCategoryDetails[],
  ): Observable<CommonCheckResponse> {
    const url =
      'http://localhost:8080/dish-categories/check-dish-categories-details'
    return this.http.post<CommonCheckResponse>(url + '', data)
  }

  checkDishes(data: IDishData): Observable<CommonCheckResponse> {
    const url = 'http://localhost:8080/dishes/check-dishes-details'
    return this.http.post<CommonCheckResponse>(url + '', data)
  }

  createRestaurants(
    data: IRestaurantDetails,
  ): Observable<CommonResponse<IRestaurantDetails>> {
    const url = 'http://localhost:8080/restaurants'
    return this.http.post<CommonResponse<IRestaurantDetails>>(url, data)
  }

  createDishCategories(
    data: IDishCategoryDetails[],
  ): Observable<CommonResponse<IDishCategoryDetails[]>> {
    const url = 'http://localhost:8080/dish-categories'
    return this.http.post<CommonResponse<IDishCategoryDetails[]>>(url, data)
  }

  createDishes(
    data: IDishRequest[],
  ): Observable<CommonResponse<IDishResponse[]>> {
    const url = 'http://localhost:8080/dishes'
    console.log(data)
    return this.http.post<CommonResponse<IDishResponse[]>>(url, data)
  }
}
