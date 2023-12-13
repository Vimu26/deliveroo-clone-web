import { Component, OnDestroy, OnInit } from '@angular/core'
import { DishesServiceService } from '../../../services/dishes-service.service'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import { DishCategory, DishCategoryData, IDish } from 'src/app/interfaces'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit, OnDestroy {
  categoryData: DishCategory[] = []
  dishCategoryData: DishCategoryData[] = []
  dishList: IDish[] = []
  private onDestroy$ = new Subject<void>()

  constructor(
    private dishesService: DishesServiceService,
    private restaurantsService: RestaurantsService,
    private dishCategoriesService: DishCategoriesService,
  ) {}

  async ngOnInit() {
    // this.getRelevantDishes()
    this.getDishCategories()
    this.getAllDishes()
  }

  getDishCategories() {
    this.dishCategoriesService.$chipData
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.categoryData.push(...data)
        console.log(this.categoryData)
      })
  }

  getAllDishes() {
    this.dishesService.getAllDishes().subscribe({
      next: (res) => {
        console.log(res)
      },
    })
  }
  // getRelevantDishes() {
  //   this.dishCategoriesService.$chipData.subscribe({
  //     next: (res) => {
  //       res.forEach((dish) => {
  //         this.categoryData.push(dish)
  //         this.dishesService
  //           .getAllCategoryDishes({
  //             restId: dish.restaurantId,
  //             catId: dish.dishCategoryId,
  //           })
  //           .subscribe({
  //             next: (res: any) => {
  //               // res.data.forEach((item: IDish)=>{
  //               //   this.dishList.push(item);
  //               // })
  //               this.dishCategoryData.push({
  //                 dishCategoryName: dish.dishCategoryName,
  //                 index: dish.index,
  //                 restaurantId: dish.restaurantId,
  //                 dishCategoryId: dish.dishCategoryId,
  //                 data: res.data as IDish[],
  //               })
  //             },
  //             error: (err) => {
  //               //
  //             },
  //           })
  //       })
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     },
  //   })
  // }

  ngOnDestroy() {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
}
