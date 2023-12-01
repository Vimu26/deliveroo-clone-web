import { Component, OnInit } from '@angular/core';
import { IDish } from 'src/app/interfaces';
import { DishesServiceService } from 'src/app/services/dishes-service.service';

@Component({
  selector: 'app-daily-specials',
  templateUrl: './daily-specials.component.html',
  styleUrls: ['./daily-specials.component.scss']
})
export class DailySpecialsComponent implements OnInit {
dishes : IDish[] = [];

constructor(private dishesService : DishesServiceService){}

ngOnInit() {
this.getAllDishes()
};

getAllDishes() {
  this.dishesService.getAllDishes().subscribe({
   next : (res: any) =>{
     res.data.forEach((item: IDish) => {
      this.dishes.push(item);
     });
     console.log(this.dishes)
   },
   error : () => {

   }
  })
}

}
