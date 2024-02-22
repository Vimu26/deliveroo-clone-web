import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IAddedDishData } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private addedToCartSubject = new BehaviorSubject<IAddedDishData[]>([])
  addedToCart$: Observable<IAddedDishData[]> =
    this.addedToCartSubject.asObservable()

  constructor() {}

  addToCart(data: IAddedDishData) {
    const currentData = this.addedToCartSubject.value
    const newData = [...currentData, data]
    this.addedToCartSubject.next(newData)
  }

  removeFromCart(index: number) {
    const currentData = this.addedToCartSubject.value;
    const updatedData = [...currentData];
    updatedData.splice(index, 1);
    this.addedToCartSubject.next(updatedData);
  }

  getAddedToCart(): Observable<IAddedDishData[]> {
    return this.addedToCart$;
  }
}
