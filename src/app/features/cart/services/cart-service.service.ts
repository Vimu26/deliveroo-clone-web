import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonResponse, IOrder, IOrderItem } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  readonly apiURL = 'http://localhost:8080/orders/'
  constructor(private http: HttpClient) {}

  public createOrder(orderData: IOrder): Observable<CommonResponse<IOrder>> {
    return this.http.post<CommonResponse<IOrder>>(this.apiURL + '', orderData)
  }
}
