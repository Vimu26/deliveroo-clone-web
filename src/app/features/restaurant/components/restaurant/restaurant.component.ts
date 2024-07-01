import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    //
  }
  onClickAddRestaurant() {
    this.router.navigate(['restaurants/create-restaurant'])
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  onClickRestaurantLogin() {
    //
  }
}
