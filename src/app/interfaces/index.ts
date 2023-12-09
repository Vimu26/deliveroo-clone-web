export interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface IDish {
  restaurant_id: string;
  order_id?: string;
  dish_category_id?: string;
  name: string;
  dish_code: string;
  price: number;
  image: string;
  calories: number;
}

export interface IRestaurant {
  name : string;
  email: string;
  contact_number:string;
  location: string;
  distance: string;
  closesAt:string;
  minimumPrice : string;
  deliveryFee : string;
  _id : string;
}
export interface IDishCategory {
  restaurant_id : string;
  dish_category_name: string;
}
export interface DishCategory {
  dish_category_name: string;
}
