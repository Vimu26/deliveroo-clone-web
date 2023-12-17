export interface IUserData {
  first_name: string
  last_name: string
  email: string
  contact_number: string
  address: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface LoginResponse {
  status: boolean
  message: string
  data: {
    token: string
  }
}

export interface IDish {
  restaurant_id: string
  order_id?: string
  dish_category_id: string
  name: string
  description: string
  price: string
  image: string
  calories: string
}

export interface IRestaurant {
  _id: string;
  name: string;
  email: string;
  contact_number: string;
  location: string;
  distance: string;
  opens_at: string;
  closes_at: string;
  minimumPrice: string;
  deliveryFee: string;
  tags: {
    delivery_time: {
      from: number;
      to: number;
    };
    tag1: string;
    tag2: string;
    tag3: string;
  };
}
export interface IDishCategory {
  restaurant_id: string
  dish_category_name: string
  _id: string
}
export interface DishCategory {
  dishCategoryName: string
  index: number
  restaurantId: string
  dishCategoryId: string
}
export interface DishCategoryData {
  dishCategoryName: string
  index: number
  restaurantId: string
  dishCategoryId: string
  data: IDish[]
}
export interface CommonResponse<T> {
  data: T
  message: string
  status: boolean
}
