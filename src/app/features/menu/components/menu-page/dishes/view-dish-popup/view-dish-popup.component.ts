import { Component, Inject, Input, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DishesServiceService } from 'src/app/features/menu/services/dishes-service.service'
import { DishAddOns, IDish } from 'src/app/interfaces'

export enum DISH_SIZE {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

@Component({
  selector: 'app-view-dish-popup',
  templateUrl: './view-dish-popup.component.html',
  styleUrls: ['./view-dish-popup.component.scss'],
})
export class ViewDishPopupComponent implements OnInit {
  @Input() dish: IDish
  imgUrl: string = ''
  quantity: number = 1
  price: number
  additionPrice: number
  DISH_SIZE = DISH_SIZE
  selectedOption: string = DISH_SIZE.SMALL

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dish: IDish },
    public dialogRef: MatDialogRef<ViewDishPopupComponent>,
    private dishService: DishesServiceService,
  ) {
    this.dish = data.dish
    this.imgUrl = data.dish.image
    this.price = data.dish.price
    this.additionPrice = this.price
  }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => {
      this.resetCheckboxValues()
    })
  }

  onClickAdd() {
    const selectedAddons = this.dish.addOns.filter(
      (addon) => addon.checked === true,
    )
    this.dialogRef.close({
      dish: this.dish,
      selectedAddons,
      dishTotal: this.additionPrice,
      quantity: this.quantity,
    })
  }

  updateAdditionPrice() {
    const addonTotal = this.getAdditionsTotal()
    this.additionPrice = parseFloat(
      (this.price * this.quantity + addonTotal).toFixed(2),
    )
  }

  onAdd() {
    this.quantity += 1
    this.updateAdditionPrice()
  }

  onRemove() {
    if (this.quantity > 1) {
      this.quantity -= 1
      this.updateAdditionPrice()
    }
  }

  getAdditionsTotal() {
    const addOnPrices = this.dish.addOns.filter(
      (element) => element.checked === true,
    )

    if (addOnPrices.length > 0) {
      const total = addOnPrices.reduce((accumulator, currentAddOn) => {
        return accumulator + currentAddOn.price
      }, 0)

      return parseFloat(total.toFixed(2))
    } else {
      return 0
    }
  }

  onCheckboxChange(addon: DishAddOns) {
    if (addon.checked) {
      this.additionPrice = parseFloat(
        (this.additionPrice + addon.price).toFixed(2),
      )
    } else {
      this.additionPrice = parseFloat(
        (this.additionPrice - addon.price).toFixed(2),
      )
    }
  }

  onClose() {
    this.resetCheckboxValues()
    this.dialogRef.close()
  }

  resetCheckboxValues() {
    this.dish.addOns.forEach((addon) => {
      addon.checked = false
    })
  }
  onChangeSize() {
    const selectedSize = this.dish.size.find(
      (sized) => sized.name === this.selectedOption,
    )
    this.additionPrice = parseFloat(
      (this.dish.price + (selectedSize?.price ?? 0)).toFixed(2),
    )
    this.price = parseFloat(
      (this.dish.price + (selectedSize?.price ?? 0)).toFixed(2),
    )
    this.resetCheckboxValues()
    this.quantity = 1
  }
}
