export interface CommonResponse<T> {
  data: T
  message: string
  status: boolean
}
export interface IUserData {
  first_name: string
  last_name: string
  email: string
  contact_number: string
  address: string
  password: string
}

export interface userDetails {
  _id: string
  full_name: string
  contact_number: string
  address: string
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
  restaurant: IRestaurant
  order?: string
  dish_category: IDishCategory
  name: string
  description: string
  price: number
  image: string
  calories: string
  addOns: DishAddOns[]
  size: Size[]
  _id: string
}

export interface DishAddOns {
  name: string
  price: number
  checked: boolean
}

export interface Size {
  name: string
  price: number
}

export interface IRestaurant {
  _id: string
  name: string
  email: string
  contact_number: string
  location: string
  distance: string
  opens_at: string
  closes_at: string
  minimumPrice: string
  deliveryFee: string
  tags: {
    delivery_time: {
      from: number
      to: number
    }
    tag1: string
    tag2: string
    tag3: string
  }
}
export interface IDishCategory {
  restaurant: string
  name: string
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
export interface CategorizedDishes {
  category: IDishCategory
  dishes: IDish[]
}

export interface IAddedDishData {
  dish: ISelectedDish
  dishCategory_id: string
  restaurant_id: string
  dishTotal: number
  selectedAddons: DishAddOns[]
  quantity: number
  size: string
}

export interface ISelectedDish {
  name: string
  _id: string
}

export interface IUserDetails {
  name: string | null | undefined 
  address: string | null | undefined 
  contact_number: string | null | undefined 
}

export interface IOrderItem {
  dish: {
    name: string
    _id: string
  }
  
  dishCategory_id: string
  restaurant_id :string
  dish_total: number
  quantity: number
  size: string
  selected_addOns: DishAddOns[]
}

export interface IOrder {
  user: string | undefined
  user_details: IUserDetails
  restaurant: string
  total_amount: number
  payment_method: string
  order_items: IOrderItem[]
  selected_option: string
}
