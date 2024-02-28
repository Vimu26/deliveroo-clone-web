import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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

  constructor(
    private basketService: BasketService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.basketService
      .getAddedToCart()
      .subscribe((data) => {
        this.order = data
        if (this.order.length === 0) {
          this.router.navigate(['menu'])
        }
      })
    console.log(this.order)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
