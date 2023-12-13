import { Component, Input, OnInit } from '@angular/core'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import { DishCategory, IDishCategory } from 'src/app/interfaces'

@Component({
  selector: 'app-dish-category',
  templateUrl: './dish-category.component.html',
  styleUrls: ['./dish-category.component.scss'],
})
export class DishCategoryComponent implements OnInit {
  @Input() restaurantId: string = ''
  chips: DishCategory[] = []
  CategoryChips: IDishCategory[] = []
  selectedChipIndex = 0

  constructor(
    private dishCategoriesService: DishCategoriesService,
    private restaurantsService: RestaurantsService,
  ) {}

  ngOnInit() {
    console.log(this.restaurantId)
    this.getAllDishCategories()
  }

  selectChip(index: number) {
    this.selectedChipIndex = index
  }

  getAllDishCategories() {
    this.dishCategoriesService
      .getAllDishCategories(this.restaurantId)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.CategoryChips.push(...res.data)
        },
      })
  }

  // getAllDishCategories(id: string) {
  //   this.dishCategoriesService.getRestaurantDishCategories(id).subscribe({
  //     next: (res: any) => {
  //       res.data.forEach((item: any) => {
  //         this.chips.push({
  //           dishCategoryName: item?.dish_category_name,
  //           index: this.chips.length,
  //           restaurantId: item?.restaurant_id,
  //           dishCategoryId: item?._id,
  //         })
  //       })
  //       this.dishCategoriesService.setChipData(this.chips)
  //     },
  //     error: () => {
  //       //
  //     },
  //   })
  // }
}
