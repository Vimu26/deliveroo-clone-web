import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonResponse, IDish } from '../../../interfaces'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DishesServiceService {
  constructor(private http: HttpClient) {}

  getAllDishes(params: HttpParams): Observable<CommonResponse<IDish[]>> {
    const url = 'http://localhost:8080/dishes/'
    return this.http.get<CommonResponse<IDish[]>>(url + '', {
      params,
    })
  }
}
