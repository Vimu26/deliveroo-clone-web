import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishesServiceService {
  readonly apiURL = 'http://localhost:8080/dishes/';
  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<IDish[]> {
   return this.http.get<IDish[]>(this.apiURL+'')
  }
}
