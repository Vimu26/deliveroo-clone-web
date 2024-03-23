import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonCheckResponse, IRestaurantDetails } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class AddEditRestaurantService {
  constructor(private http: HttpClient) {}

  checkRestaurantDetails(
    data: IRestaurantDetails,
  ): Observable<CommonCheckResponse> {
    const url = 'http://localhost:8080/restaurants//check-restaurant-details'
    return this.http.post<CommonCheckResponse>(url + '', data)
  }
}
