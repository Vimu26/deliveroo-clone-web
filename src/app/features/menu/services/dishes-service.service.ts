import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonResponse, IDish } from '../../../interfaces'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

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
//send token manually
// getAllDishes(params: HttpParams): Observable<CommonResponse<IDish[]>> {
//   const url = 'http://localhost:8080/dishes/'
//   const token = localStorage.getItem('token')
//   const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
//   return this.http.get<CommonResponse<IDish[]>>(url + '', {
//     params,
//     headers,
//   })
// }
