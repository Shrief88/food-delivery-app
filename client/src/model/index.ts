export interface IMeal {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  sold: number;
  ratingAverage: number;
  ratingQuantity: number;
  category: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  currentPage: number;
  limit: number;
  numberOfPages: number;
}

export interface GetMealsResults {
  result: number;
  pagination: Pagination;
  data: IMeal[];
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id: string;
  name: string;
  slug: string;
  email: string;
  image: string;
}

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}

export interface ICartItem {
  name: string;
  mealId: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IReview {
  _id: string;
  title: string;
  description?: string;
  user: {
    _id: string;
    name: string;
  };
  meal: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  cartItems: [
    {
      name: string;
      mealId: string;
      quantity: number;
      price: number;
      image: string;
    }
  ];
  totalPrice: number;
  user: string;
  shippingPrice: number;
  transactionFee: number;
  shippingInfo: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
