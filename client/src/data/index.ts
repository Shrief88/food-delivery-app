import axios from "axios";

import { GetMealsResults, ICategory } from "@/model";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers["Content-type"] = "application/json";

export const getAllMeals = async (page: number): Promise<GetMealsResults> =>
  (await axios.get(`/meal?limit=12&page=${page}`)).data;

export const getMealsByCategory = async (
  id: string
): Promise<GetMealsResults> => (await axios.get(`/category/${id}/meals`)).data;

export const getAllCategories = async (): Promise<ICategory[]> =>
  (await axios.get("/category")).data.data;
