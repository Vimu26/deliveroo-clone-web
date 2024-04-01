import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RestaurantRoutingModule } from './restaurant-routing.module'
import { RestaurantComponent } from './components/restaurant/restaurant.component'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/material.module'
import { AddEditRestaurantComponent } from './components/add-edit-restaurant/add-edit-restaurant.component'
import { DishesComponent } from './components/add-edit-restaurant/sections/dishes/dishes.component'
import { DishCategoriesComponent } from './components/add-edit-restaurant/sections/dish-categories/dish-categories.component'
import { RestaurantDetailsComponent } from './components/add-edit-restaurant/sections/restaurant-details/restaurant-details.component'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { FileUploadComponent } from 'src/app/common-components/file-upload/file-upload.component'


// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCnb6mL7ggQnuLXYNX8zviSHTct3e37q6c",
  authDomain: "foodie-81a18.firebaseapp.com",
  projectId: "foodie-81a18",
  storageBucket: "foodie-81a18.appspot.com",
  messagingSenderId: "1025498188968",
  appId: "1:1025498188968:web:6e1416c11fed02560fc69d"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    RestaurantComponent,
    AddEditRestaurantComponent,
    RestaurantDetailsComponent,
    DishCategoriesComponent,
    DishesComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class RestaurantModule {}
