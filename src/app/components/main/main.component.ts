import { Component } from '@angular/core'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  src = 'https://logos-world.net/wp-content/uploads/2021/02/Deliveroo-Logo.png'

  myMethod() {
    alert('You Clicked The Logo')
  }
}
