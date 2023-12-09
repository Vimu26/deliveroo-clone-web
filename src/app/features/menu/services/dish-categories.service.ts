import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish, IDishCategory } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishCategoriesService {
  readonly apiURL = 'http://localhost:8080/dish-categories/';
  constructor(private http: HttpClient) { }

  //get All dish categories
  getAllDishCategories(): Observable<IDishCategory[]> {
   return this.http.get<IDishCategory[]>(this.apiURL+'')
  }

  //get all dish categories by restaurant ID
  getRestaurantDishCategories(id:string): Observable<IDishCategory[]> {
    return this.http.get<IDishCategory[]>(this.apiURL+id)
   }
}
