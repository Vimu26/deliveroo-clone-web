import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  chips = [
    'New daily Specials',
    'Salads',
    'Hot Power Bowls',
    'Gym food',
    'Bundles',
    'Rainbow Wraps',
    'Vegan Menu',
    'Snacks & Sides',
  ];
  selectedChipIndex = 0;
  options = ['Yoghurt & Fruits', 'Cold Drinks', 'Smoothies, Shakes & Juice'];
  isSelectOpen: boolean = false;

  selectChip(index: number) {
    this.selectedChipIndex = index;
  }

  isDropdownOpen: boolean = false;
  selectedOption: string | null = null;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
