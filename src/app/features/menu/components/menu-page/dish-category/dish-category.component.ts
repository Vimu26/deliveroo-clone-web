import { Component, Input, OnInit } from '@angular/core'
import { DishCategoriesService } from '../../../services/dish-categories.service'
import { DishCategory, IDishCategory } from 'src/app/interfaces'
import { HttpParams } from '@angular/common/http'
import { MenuCommunicationService } from '../../../services/menu-communication.service'

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
    private menuCommunicationService: MenuCommunicationService,
  ) {}

  ngOnInit() {
    this.getAllDishCategories()
  }

  selectChip(index: number) {
    this.selectedChipIndex = index
    this.menuCommunicationService.setSelectedCategoryIndex(index)
  }

  getAllDishCategories() {
    const params = new HttpParams().append('restaurant', this.restaurantId)
    this.dishCategoriesService.getAllDishCategories(params).subscribe({
      next: (res) => {
        this.CategoryChips.push(...res.data)
        this.dishCategoriesService.setChipData(this.CategoryChips)
      },
    })
  }
}
