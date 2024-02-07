import { Component, Inject, Input, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IDish } from 'src/app/interfaces'

@Component({
  selector: 'app-view-dish-popup',
  templateUrl: './view-dish-popup.component.html',
  styleUrls: ['./view-dish-popup.component.scss'],
})
export class ViewDishPopupComponent implements OnInit {
  @Input() dish: IDish
  imgUrl: string = ''
  quantity: number = 1

  constructor(@Inject(MAT_DIALOG_DATA) public data: { dish: IDish }) {
    this.dish = data.dish
    this.imgUrl = data.dish.image
  }

  ngOnInit(): void {
    console.log(this.dish.calories)
  }

  onClickAdd() {
    //
  }
}
