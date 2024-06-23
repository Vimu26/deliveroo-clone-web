import { Component, OnInit, ViewChild } from '@angular/core'
import {
  IDish,
  IDishCategory,
  IDishCategoryDetails,
  IDishData,
  IDishRequest,
  IRestaurantDetails,
} from 'src/app/interfaces'
import { ScrollToTopService } from 'src/app/services/scroll-to-top.service'
import { AddEditRestaurantService } from './services/add-edit-restaurant.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.scss'],
})
export class AddEditRestaurantComponent implements OnInit {
  @ViewChild('stepper') stepper: any
  isAddRestaurantDetailsSelected = false
  isDishCategoriesSelected = false
  isDishSectionSelected = false

  isAddRestaurantDetailsCompleted = false
  isDishCategoriesCompleted = false
  isDishSectionCompleted = false

  formData_RestaurantDetails!: IRestaurantDetails
  formData_DishCategories: IDishCategoryDetails[] = []
  formData_dishes: IDishData[] = []
  loading = false

  constructor(
    private scrollToTopService: ScrollToTopService,
    private addEditRestaurantService: AddEditRestaurantService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.scrollToTopService.scrollToTop()
    this.isAddRestaurantDetailsSelected = true
  }
  onStepChange(e: any) {
    const selectedIndex = e.selectedIndex
    const previouslySelectedIndex = e.previouslySelectedIndex

    switch (selectedIndex) {
      case 0:
        this.isAddRestaurantDetailsSelected = true
        this.isDishCategoriesCompleted = false
        this.isDishSectionSelected = false
        break
      case 1:
        this.isDishCategoriesSelected = true
        this.isAddRestaurantDetailsSelected = false
        this.isDishSectionSelected = false

        break
      case 2:
        this.isDishSectionSelected = true
        this.isDishCategoriesSelected = false
        this.isAddRestaurantDetailsSelected = false
        break
      default:
        break
    }

    switch (previouslySelectedIndex) {
      case 0:
        this.isAddRestaurantDetailsSelected = false
        break
      case 1:
        this.isDishCategoriesSelected = false
        break
      case 2:
        this.isDishSectionSelected = false
        break
      default:
        break
    }
  }

  onNextClicked(e: number, data: any) {
    this.scrollToTopService.scrollToTop()
    switch (e) {
      case 1:
        this.isAddRestaurantDetailsCompleted = true
        this.isAddRestaurantDetailsSelected = false
        this.formData_RestaurantDetails = data.data
        this.isDishCategoriesSelected = true
        break
      case 2:
        this.isDishCategoriesCompleted = true
        this.isDishCategoriesSelected = false
        this.formData_DishCategories = data.data
        this.isDishSectionSelected = true
        break
      case 3:
        this.isDishSectionCompleted = true
        this.isDishSectionSelected = false
        this.formData_dishes = data.data
        break
      default:
        break
    }
    if (this.isDishSectionCompleted) {
      this.onClickAddRestaurant()
    } else {
      setTimeout(() => {
        this.stepper.next()
      }, 10)
    }
  }

  onBackClicked() {
    this.stepper.previous()
  }

  onClickAddRestaurant() {
    this.loading = true
    this.addEditRestaurantService
      .createRestaurants(this.formData_RestaurantDetails)
      .subscribe({
        next: (restaurantResponse) => {
          if (restaurantResponse.data._id) {
            const dishCategories: IDishCategoryDetails[] = []
            this.formData_DishCategories.forEach((data) => {
              dishCategories.push({
                restaurant: restaurantResponse.data._id,
                name: data.name,
              })
            })
            this.addEditRestaurantService
              .createDishCategories(dishCategories)
              .subscribe({
                next: (dishCategoriesResponse) => {
                  if (dishCategoriesResponse.data) {
                    const dishesRequest: IDishRequest[] = []
                    this.formData_dishes.forEach((dish) => {
                      const categoryData = dishCategoriesResponse.data.find(
                        (category) => category.name === dish.dish_category,
                      )
                      if (categoryData?._id && restaurantResponse.data._id) {
                        dishesRequest.push({
                          dish_category: categoryData._id,
                          restaurant: restaurantResponse.data._id,
                          name: dish.name,
                          description: dish.description,
                          price: dish.price,
                          image: dish.image,
                          calories: dish.calories,
                          addOns: dish.addOns,
                          size: dish.size,
                        })
                      }
                    })
                    this.addEditRestaurantService
                      .createDishes(dishesRequest)
                      .subscribe({
                        next: (dishesResponse) => {
                          this.router.navigate(['restaurant'])
                          this.loading = false
                        },
                        error(err) {
                          console.log(err)
                        },
                      })
                  }
                },
                error(err) {
                  console.log(err)
                },
              })
          }
        },
        error(err) {
          console.log(err)
        },
      })
    this.loading = false
  }
}
