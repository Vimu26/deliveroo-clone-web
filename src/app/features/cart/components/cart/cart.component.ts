import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, min } from 'rxjs'
import { BasketService } from 'src/app/features/menu/components/menu-page/basket/services/basket.service'
import { AuthService } from 'src/app/features/auth/services/auth.service'
import { userDetails } from 'src/app/interfaces'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { FormControl, FormGroup, Validators } from '@angular/forms'

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
  selectedPaymentOption: string = PAYMENT_METHOD.CASH
  userDetails: userDetails | undefined
  selectedOption: string = 'TakeAway'

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
  ) {}

  toggleSelection(event: MatCheckboxChange, value: string) {
    if (event.checked && this.selectedOption === value) {
      return
    }
    this.selectedOption = event.checked ? value : ''
  }

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
    this.userForm.value
    this.selectedPaymentOption
    this.selectedOption
    const OrderDetails = {
      userId : this.userDetails?._id,
      name: this.userForm.value.name,
      address: this.userForm.value.address,
      contactNumber: this.userForm.value.contactNumber,
      totalAmount: this.userForm.value.totalAmount,
      paymentMethod: this.selectedPaymentOption,
      selectedOption : this.selectedOption,
      orderItems: this.order,
    }
    console.log(OrderDetails)
  }
}
