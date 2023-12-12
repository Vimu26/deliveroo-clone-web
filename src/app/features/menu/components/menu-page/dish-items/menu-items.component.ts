import { Component, OnInit } from '@angular/core'
import { DishesServiceService } from '../../../services/dishes-service.service'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import { DishCategory, DishCategoryData, IDish } from 'src/app/interfaces'

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent {
  categoryData: DishCategory[] = []
  dishCategoryData: DishCategoryData[] = []
  dishList: IDish[] = []
  constructor(
    private dishesService: DishesServiceService,
    private restaurantsService: RestaurantsService,
    private dishCategoriesService: DishCategoriesService,
  ) {}

  async ngOnInit() {
    this.getRelevantDishes()
  }

  getRelevantDishes() {
    this.dishCategoriesService.$chipData.subscribe({
      next: (res) => {
        res.forEach((dish) => {
          this.categoryData.push(dish)
          console.log(dish)
          this.dishesService
            .getAllCategoryDishes({
              restId: dish.restaurantId,
              catId: dish.dishCategoryId,
            })
            .subscribe({
              next: (res: any) => {
                console.log(res)
                // res.data.forEach((item: IDish)=>{
                //   this.dishList.push(item);
                // })
                this.dishCategoryData.push({
                  dishCategoryName: dish.dishCategoryName,
                  index: dish.index,
                  restaurantId: dish.restaurantId,
                  dishCategoryId: dish.dishCategoryId,
                  data: res.data as IDish[],
                })
                console.log(this.dishCategoryData)
              },
              error: (err) => {
                //
              },
            })
        })
        console.log(this.categoryData)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
