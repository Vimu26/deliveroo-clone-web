import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { DishesServiceService } from '../../../services/dishes-service.service'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import { DishCategory, DishCategoryData, IDish } from 'src/app/interfaces'
import { Subject, takeUntil } from 'rxjs'
import { HttpParams } from '@angular/common/http'

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
  @Input() restaurantId: string = ''

  constructor(
    private dishesService: DishesServiceService,
    private restaurantsService: RestaurantsService,
    private dishCategoriesService: DishCategoriesService,
  ) {}

  async ngOnInit() {
    this.getDishCategories()
    this.getAllDishes()
  }

  getDishCategories() {
    this.dishCategoriesService.$chipData
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.categoryData.push(...data)
      })
  }

  getAllDishes() {
    const params = new HttpParams().append('restaurantId', this.restaurantId)
    this.dishesService.getAllDishes(params).subscribe({
      next: (res) => {
        console.log(res)
      },
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
}
