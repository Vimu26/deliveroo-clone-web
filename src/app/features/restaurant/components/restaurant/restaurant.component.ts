import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  hidePassword = true
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor() {}

  ngOnInit(): void {
    //
  }
  onClickAddRestaurant() {
    //
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  onClickRestaurantLogin(){
    //
  }
}
