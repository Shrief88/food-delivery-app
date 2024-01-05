import { axiosClient } from "./axios";
import { GetMealsResults, ICategory, IMeal } from "@/model";

export const getAllMeals = async (page: number): Promise<GetMealsResults> =>
  (await axiosClient.get(`/meal?limit=12&page=${page}`)).data;

export const getMealsByCategory = async (
  id: string
): Promise<GetMealsResults> =>
  (await axiosClient.get(`/category/${id}/meals`)).data;

export const getAllCategories = async (): Promise<ICategory[]> =>
  (await axiosClient.get("/category")).data.data;

export const getMealById = async (id: string): Promise<IMeal> =>
  (await axiosClient.get(`/meal/${id}`)).data.data;
