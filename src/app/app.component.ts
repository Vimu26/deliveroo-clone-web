import { Component } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'deliveroo-clone-web';
  showFiller = false;
  sidenav: any;

  // onClick(){
  //   alert("You Clicked the Button");
  // }
}
