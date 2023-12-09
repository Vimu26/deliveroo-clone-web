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
  chips: DishCategory[] = [];
  selectedChipIndex = 0;

  constructor(
    private dishCategoriesService: DishCategoriesService,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    this.getRestaurantId();
  }

  private getRestaurantId() {
    this.restaurantsService.$restaurantId.subscribe((restaurantId) => {
      this.restaurantId = restaurantId;
    });
    this.getAllDishCategories(this.restaurantId);
  }

  selectChip(index: number) {
    this.selectedChipIndex = index;
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
