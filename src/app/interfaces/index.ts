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
  restaurant: string
  order?: string
  dish_category: IDishCategory
  name: string
  description: string
  price: number
  image: string
  calories: string
  addOns: DishAddOns[]
  size : Size[]
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
  dish: IDish
  dishTotal: number
  selectedAddons: DishAddOns[]
  quantity: number
  size : string
}
