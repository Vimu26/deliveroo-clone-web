import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { DishesServiceService } from '../../../services/dishes-service.service'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import {
  CategorizedDishes,
  DishCategoryData,
  IAddedDishData,
  IDish,
  IDishCategory,
} from 'src/app/interfaces'
import { Subject, takeUntil } from 'rxjs'
import { HttpParams } from '@angular/common/http'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MenuCommunicationService } from '../../../services/menu-communication.service'
import { MatDialog } from '@angular/material/dialog'
import { ViewDishPopupComponent } from './view-dish-popup/view-dish-popup.component'
import { BasketService } from '../basket/services/basket.service'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  animations: [
    trigger('zoom', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.08)' })),
      transition('normal <=> hovered', animate('200ms linear')),
    ]),
  ],
})
export class DishesComponent implements OnInit, OnDestroy {
  hoveredIndex: number | null = null
  categoryData: IDishCategory[] = []
  dishCategoryData: DishCategoryData[] = []
  dishList: IDish[] = []
  AddedToCart: IAddedDishData[] = []
  categorizedDishes: CategorizedDishes[] = []
  private onDestroy$ = new Subject<void>()
  hoveredIndices: { [categoryIndex: number]: number | null } = {}
  @Input() restaurantId: string = ''

  constructor(
    private dishesService: DishesServiceService,
    private menuCommunicationService: MenuCommunicationService,
    private dishCategoriesService: DishCategoriesService,
    public dialog: MatDialog,
    public basketService: BasketService,
  ) {}

  async ngOnInit() {
    this.getDishCategories()
    this.getAllDishes()
    this.subscribeToSelectedCategory()
    this.getDataToAddToCart()
  }

  private subscribeToSelectedCategory() {
    this.menuCommunicationService.selectedCategoryIndex$.subscribe((index) => {
      this.scrollToCategory(index)
    })
  }
  getDataToAddToCart() {
    //   this.dishesService.dishData$.subscribe((data) => {
    //   console.log('Dish details:', data.dish);
    //   console.log('Selected addons:', data.selectedAddons);
    //   // Handle the data as needed in your main component
    // });
  }

  scrollToCategory(index: number) {
    const categoryElement = document.getElementById(`category-${index}`)
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

  setHoveredState(categoryIndex: number, dishIndex: number | null) {
    this.hoveredIndices[categoryIndex] = dishIndex
  }

  onClickDish(dish: IDish) {
    const dialogRef = this.dialog.open(ViewDishPopupComponent, {
      width: '500px',
      height: '650px',
      data: { dish },
    })

    dialogRef.afterClosed().subscribe((result: IAddedDishData) => {
      if (result) {
        console.log(result)
        this.AddedToCart.push(result)
        this.basketService.addToCart(result)
      }
    })
  }
}
