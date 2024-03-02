import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { BasketService } from 'src/app/features/menu/components/menu-page/basket/services/basket.service'
import { AuthService } from 'src/app/features/auth/services/auth.service'

export enum PAYMENT_METHOD {
  CASH = 'CASH',
  CARD = 'CARD',
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()
  order: any
  orderTotal: number = 0
  PAYMENT_METHOD = PAYMENT_METHOD
  selectedOption: string = PAYMENT_METHOD.CASH

  constructor(
    private basketService: BasketService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.basketService
      .getAddedToCart()
      .subscribe((data) => {
        this.order = data
        this.orderTotal = this.order.reduce(
          (total: number, item: { dishTotal: number }) =>
            total + item.dishTotal,
          0,
        )
        if (this.order.length === 0) {
          this.router.navigate(['menu'])
        }
      })
    console.log(this.order)
    this.getUser()
  }

  getUser() {
    const token = localStorage.getItem('token') ?? ''
    this.authService.getUserByToken(token).subscribe({
      next: (res) => {
        console.log(res)
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
