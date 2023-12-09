import { Component, OnInit } from '@angular/core';
import { DishCategoriesService } from '../../../services/dish-categories.service';
import { RestaurantsService } from '../../../services/restaurant.service';
import { DishCategory } from 'src/app/interfaces';

@Component({
  selector: 'app-dish-category',
  templateUrl: './dish-category.component.html',
  styleUrls: ['./dish-category.component.scss'],
})
export class DishCategoryComponent implements OnInit {
  restaurantId: string = '';
  showDropdown = false;
  isOptionSelected = false;
  chips: DishCategory[] = [];
  selectedChipIndex = 0;
  isDropdownOpen: boolean = false;
  optionSelected = '';
  isContentFixed = false;
  headerHeight = 0;

  constructor(
    private dishCategoriesService: DishCategoriesService,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    this.getRestaurantId();
    this.isOptionSelected = false;
  }

  private getRestaurantId() {
    this.restaurantsService.$restaurantId.subscribe((restaurantId) => {
      this.restaurantId = restaurantId;
    });
    console.log(this.restaurantId);
    this.getAllDishCategories(this.restaurantId);
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

  getAllDishCategories(id: string) {
    this.dishCategoriesService.getRestaurantDishCategories(id).subscribe({
      next: (res: any) => {
        res.data.forEach((item: any) => {
          console.log(item);
          this.chips.push(item?.dish_category_name);
        });
        console.log(this.chips);
      },
      error: () => {
        //
      },
    });
  }
}
