import { Component, OnInit } from '@angular/core';
import { DishCategoriesService } from 'src/app/features/menu/services/dish-categories.service';
import { DishesServiceService } from 'src/app/features/menu/services/dishes-service.service';
import { RestaurantsService } from 'src/app/features/menu/services/restaurant.service';
import { DishCategory, IDish } from 'src/app/interfaces';

@Component({
  selector: 'app-new-daily-specials',
  templateUrl: './new-daily-specials.component.html',
  styleUrls: ['./new-daily-specials.component.scss'],
})
export class NewDailySpecialsComponent implements OnInit {
  dishList: IDish[] = [];
  restaurantId: string = '';
  categoryData: DishCategory[] = [];

  constructor(
    private dishesService: DishesServiceService,
    private restaurantsService: RestaurantsService,
    private dishCategoriesService: DishCategoriesService
  ) {}

  async ngOnInit() {
    this.getRelevantDishes()
  }

    getRelevantDishes() {
      this.dishCategoriesService.$chipData.subscribe({
       next : (res) => {
        res.forEach((dish) => {
          this.categoryData.push(dish);
        });
        console.log(this.categoryData);
       },
       error: (err) =>{
        console.log(err);
       }
    });
    }
  // getCategoryData() {
  //   this.categoryData = this.dishCategoriesService.getChipData();
  //   console.log(this.categoryData);
  // }
}
