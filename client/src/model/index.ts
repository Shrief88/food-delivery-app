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
  email : string;
  image : string;
}

export interface LoginResponse {
  accessToken: string;
  user : IUser
}
