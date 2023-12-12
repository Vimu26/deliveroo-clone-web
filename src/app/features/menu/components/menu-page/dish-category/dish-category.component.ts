import { Component, OnInit } from '@angular/core'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import { DishCategory } from 'src/app/interfaces'

@Component({
  selector: 'app-dish-category',
  templateUrl: './dish-category.component.html',
  styleUrls: ['./dish-category.component.scss'],
})
export class DishCategoryComponent implements OnInit {
  restaurantId: any = ''
  chips: DishCategory[] = []
  selectedChipIndex = 0

  constructor(
    private dishCategoriesService: DishCategoriesService,
    private restaurantsService: RestaurantsService,
  ) {}

  ngOnInit() {
    this.getRestaurantId()
  }

  private getRestaurantId() {
    this.restaurantId = localStorage.getItem('RESTAURANT_ID')
    if (this.restaurantId) {
      this.getAllDishCategories(this.restaurantId)
    }
  }
  selectChip(index: number) {
    this.selectedChipIndex = index
  }

  getAllDishCategories(id: string) {
    this.dishCategoriesService.getRestaurantDishCategories(id).subscribe({
      next: (res: any) => {
        res.data.forEach((item: any) => {
          this.chips.push({
            dishCategoryName: item?.dish_category_name,
            index: this.chips.length,
            restaurantId: item?.restaurant_id,
            dishCategoryId: item?._id,
          })
        })
        this.dishCategoriesService.setChipData(this.chips)
      },
      error: () => {
        //
      },
    })
  }
}
