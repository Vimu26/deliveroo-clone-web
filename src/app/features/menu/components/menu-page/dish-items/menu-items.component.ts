import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent {
  dataArray: number[] = [1, 2, 3, 4, 5, 6, 7];
}
