import { Component, OnDestroy, OnInit } from '@angular/core'
import { BasketService } from './services/basket.service'
import { IAddedDishData } from 'src/app/interfaces'
import { Subscription } from 'rxjs'
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  addedToCart: IAddedDishData[] = []
  subscription: Subscription = new Subscription()

  constructor(
    private basketService: BasketService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription = this.basketService
      .getAddedToCart()
      .subscribe((data) => {
        this.addedToCart = data
      })
  }

  onClickCheckout() {
    console.log(this.addedToCart)
    this.router.navigate(['cart'])
  }

  removeDish(index: number) {
    this.basketService.removeFromCart(index)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
