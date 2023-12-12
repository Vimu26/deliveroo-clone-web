import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IDish } from '../../../interfaces'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DishesServiceService {
  readonly apiURL = 'http://localhost:8080/dishes/'
  readonly apiURL2 = 'http://localhost:8080/dishes/dish-categories/'
  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.apiURL + '')
  }

  // get dish by restaurant id and dish category id
  getAllCategoryDishes(id: { restId: any; catId: any }): Observable<IDish[]> {
    const url = `${this.apiURL2}${id.restId}/${id.catId}`
    return this.http.get<IDish[]>(url)
  }
}
