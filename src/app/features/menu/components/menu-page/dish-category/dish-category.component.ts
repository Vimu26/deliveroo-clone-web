import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-category',
  templateUrl: './dish-category.component.html',
  styleUrls: ['./dish-category.component.scss'],
})
export class DishCategoryComponent implements OnInit {
  showDropdown = false;
  isOptionSelected = false;
  options = ['Yoghurt & Fruits', 'Cold Drinks', 'Smoothies, Shakes & Juice'];
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
  isDropdownOpen: boolean = false;
  optionSelected = '';
  isContentFixed = false;
  headerHeight = 0;

  ngOnInit() {
    this.isOptionSelected = false;
  }

  selectChip(index: number) {
    this.selectedChipIndex = index;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string): void {
    this.optionSelected = option;
    this.isOptionSelected = true;
  }
}
