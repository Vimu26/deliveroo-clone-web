import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { BasketService } from 'src/app/features/menu/components/menu-page/basket/services/basket.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()
  order: any

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.subscription = this.basketService
      .getAddedToCart()
      .subscribe((data) => {
        this.order = data
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
