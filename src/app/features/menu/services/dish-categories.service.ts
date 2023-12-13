import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { DishCategory, IDishCategory } from '../../../interfaces'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DishCategoriesService {
  chipData: DishCategory[] = []
  public $chipData = new BehaviorSubject<DishCategory[]>([])
  readonly apiURL = 'http://localhost:8080/dish-categories/'
  readonly apiURL2 = 'http://localhost:8080/dish-categories/restaurant/'
  constructor(private http: HttpClient) {}

  setChipData(categoryData: DishCategory[]) {
    this.chipData.push(...categoryData)
    this.$chipData.next(this.chipData)
  }

  //get All dish categories
  getAllDishCategories(): Observable<IDishCategory[]> {
    return this.http.get<IDishCategory[]>(this.apiURL + '')
  }

  //get all dish categories by restaurant ID
  getRestaurantDishCategories(id: any): Observable<IDishCategory[]> {
    return this.http.get<IDishCategory[]>(this.apiURL2 + id)
  }
}
