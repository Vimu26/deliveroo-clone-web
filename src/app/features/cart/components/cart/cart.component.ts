import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, min } from 'rxjs'
import { BasketService } from 'src/app/features/menu/components/menu-page/basket/services/basket.service'
import { AuthService } from 'src/app/features/auth/services/auth.service'
import {
  IAddedDishData,
  IOrder,
  IOrderItem,
  userDetails,
} from 'src/app/interfaces'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CartServiceService } from '../../services/cart-service.service'

export enum PAYMENT_METHOD {
  CASH = 'CASH',
  CARD = 'CARD',
}
export enum SHOPPING_TYPE {
  TAKEAWAY = 'TAKEAWAY',
  DELIVERY = 'DELIVERY',
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  selectedDecision: SHOPPING_TYPE = SHOPPING_TYPE.TAKEAWAY
  SHOPPING_TYPE = SHOPPING_TYPE
  subscription: Subscription = new Subscription()
  order: IAddedDishData[] = []
  orderTotal: number = 0
  PAYMENT_METHOD = PAYMENT_METHOD
  selectedPaymentOption: string = PAYMENT_METHOD.CASH
  userDetails: userDetails | undefined

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.min(10),
    ]),
    totalAmount: new FormControl('', Validators.required),
  })

  constructor(
    private basketService: BasketService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartServiceService,
  ) {}

  // toggleSelection(event: MatCheckboxChange, value: string) {
  //   if (event.checked && this.selectedOption === value) {
  //     return
  //   }
  //   this.selectedOption = event.checked ? value : ''
  // }

  ngOnInit(): void {
    this.subscription = this.basketService
      .getAddedToCart()
      .subscribe((data) => {
        console.log(data)
        this.order = data
        this.orderTotal = this.order.reduce(
          (total: number, item: { dishTotal: number }) =>
            total + item.dishTotal,
          0,
        )
        this.orderTotal = parseFloat(this.orderTotal.toFixed(2))
        if (this.order.length === 0) {
          this.router.navigate(['menu'])
        }
      })
    this.getUser()
  }

  getUser() {
    const token = localStorage.getItem('token') ?? ''
    this.authService.getUserByToken(token).subscribe({
      next: (res) => {
        this.userDetails = res.data
        this.userForm.patchValue({
          name: this.userDetails.full_name,
          address: this.userDetails.address,
          contactNumber: this.userDetails.contact_number,
          totalAmount: `£${this.orderTotal}`,
        })
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onPlaceOrder() {
    const orderDetails: IOrder = {
      user: this.userDetails?._id,
      user_details: {
        name: this.userForm?.value.name,
        address: this.userForm?.value.address,
        contact_number: this.userForm?.value.contactNumber,
      },
      total_amount: this.orderTotal,
      payment_method: this.selectedPaymentOption,
      selected_option: this.selectedDecision,
      order_items: this.order as unknown as IOrderItem[],
      restaurant: this.order[0]?.restaurant_id,
    }
    console.log(orderDetails)

    this.cartService.createOrder(orderDetails).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  onDecisionChange(e: SHOPPING_TYPE) {
    this.selectedDecision = e
  }
}
