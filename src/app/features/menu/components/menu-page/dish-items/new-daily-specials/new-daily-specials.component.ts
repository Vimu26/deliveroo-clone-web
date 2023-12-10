import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-daily-specials',
  templateUrl: './new-daily-specials.component.html',
  styleUrls: ['./new-daily-specials.component.scss'],
})
export class NewDailySpecialsComponent {
  dataArray: number[] = [1, 2, 3, 4, 5, 6, 7];
}
