import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import {
  CommonResponse,
  DishCategory,
  IDishCategory,
} from '../../../interfaces'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DishCategoriesService {
  chipData: DishCategory[] = []
  public $chipData = new BehaviorSubject<DishCategory[]>([])

  constructor(private http: HttpClient) {}

  setChipData(categoryData: DishCategory[]) {
    this.chipData.push(...categoryData)
    this.$chipData.next(this.chipData)
  }

  //get All dish categories
  getAllDishCategories(
    params: HttpParams,
  ): Observable<CommonResponse<IDishCategory[]>> {
    const url = 'http://localhost:8080/dish-categories/'
    return this.http.get<CommonResponse<IDishCategory[]>>(url + '', {
      params,
    })
  }
}
