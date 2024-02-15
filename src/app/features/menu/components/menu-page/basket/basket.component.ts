import { Component, OnDestroy, OnInit } from '@angular/core'
import { BasketService } from './services/basket.service'
import { IAddedDishData } from 'src/app/interfaces'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  addedToCart: IAddedDishData[] = []
  subscription: Subscription = new Subscription()

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.subscription = this.basketService.addedToCart$.subscribe((data) => {
      this.addedToCart = data
      console.log(this.addedToCart)
    })
  }

  onClickCheckout() {
    //
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
