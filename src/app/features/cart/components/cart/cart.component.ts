import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { BasketService } from 'src/app/features/menu/components/menu-page/basket/services/basket.service'
import { AuthService } from 'src/app/features/auth/services/auth.service'
import { userDetails } from 'src/app/interfaces'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { FormControl, FormGroup } from '@angular/forms'

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
  userDetails : userDetails | undefined
  selected: number = 0;

  userForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contactNumber: new FormControl(''),
    totalAmount: new FormControl('')
  });

  constructor(
    private basketService: BasketService,
    private router: Router,
    private authService: AuthService,
  ) {}

  toggleSelection(event: MatCheckboxChange, value: number) {
    if (event.checked && this.selected === value) {
      this.selected = -1;
    } else {
      this.selected = value;
    }
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
    console.log(this.order)
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
          totalAmount : `£${this.orderTotal}`,
        });
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
