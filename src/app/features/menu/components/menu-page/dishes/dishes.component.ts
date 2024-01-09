import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { DishesServiceService } from '../../../services/dishes-service.service'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { RestaurantsService } from '../../../services/restaurant.service'
import {
  CategorizedDishes,
  DishCategoryData,
  IDish,
  IDishCategory,
} from 'src/app/interfaces'
import { Subject, takeUntil } from 'rxjs'
import { HttpParams } from '@angular/common/http'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MenuCommunicationService } from '../../../services/menu-communication.service'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  animations: [
    trigger('zoom', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.04)' })),
      transition('normal <=> hovered', animate('200ms linear')),
    ]),
  ],
})
export class DishesComponent implements OnInit, OnDestroy {
  hoveredIndex: number | null = null
  categoryData: IDishCategory[] = []
  dishCategoryData: DishCategoryData[] = []
  dishList: IDish[] = []
  categorizedDishes: CategorizedDishes[] = []
  private onDestroy$ = new Subject<void>()
  @Input() restaurantId: string = ''

  constructor(
    private dishesService: DishesServiceService,
    private menuCommunicationService: MenuCommunicationService,
    private dishCategoriesService: DishCategoriesService,
  ) {}

  async ngOnInit() {
    this.getDishCategories()
    this.getAllDishes()
    this.subscribeToSelectedCategory()
  }

  private subscribeToSelectedCategory() {
    this.menuCommunicationService.selectedCategoryIndex$.subscribe((index) => {
      this.scrollToCategory(index)
    })
  }

  scrollToCategory(index: number) {
    const categoryElement = document.getElementById(`category-${index - 1}`)
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  getDishCategories() {
    this.dishCategoriesService.$chipData
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.categoryData = data
      })
  }

  getAllDishes() {
    const params = new HttpParams().append('restaurant', this.restaurantId)
    this.dishesService.getAllDishes(params).subscribe({
      next: (res) => {
        this.categorizedDishes = this.categoryData.map((item) => {
          const dishes = res.data.filter((data) => {
            return item._id.toString() === data.dish_category._id.toString()
          })
          return {
            category: item,
            dishes: dishes,
          }
        })
      },
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }
  setHoveredState(index: number | null) {
    this.hoveredIndex = index
  }
}
