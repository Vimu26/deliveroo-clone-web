import { Component, Inject, Input, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DishAddOns, IDish } from 'src/app/interfaces'

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dish: IDish },
    public dialogRef: MatDialogRef<ViewDishPopupComponent>,
  ) {
    this.dish = data.dish
    this.imgUrl = data.dish.image
    this.price = data.dish.price
    this.additionPrice = this.price
  }

  ngOnInit(): void {
    console.log(this.dish.calories)
    this.dialogRef.beforeClosed().subscribe(() => {
      this.resetCheckboxValues()
    })
  }

  onClickAdd() {
    //
  }

  updateAdditionPrice() {
    const addonTotal = this.getAdditionsTotal()
    this.additionPrice = this.price * this.quantity + addonTotal
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

      return total
    } else {
      return 0
    }
  }

  onCheckboxChange(addon: DishAddOns) {
    if (addon.checked) {
      this.additionPrice +=  addon.price
    } else {
      this.additionPrice -= addon.price
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
}
