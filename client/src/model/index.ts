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
  }
  createdAt: Date;
  updatedAt: Date;
}

interface Paggination {
  currentPage: number;
  limit: number;
  numberOfPages: number;
}

export interface GetMealsResults {
  result: number;
  paggination: Paggination;
  data: IMeal[];
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

