import axios, { AxiosPromise } from "axios";

import { GetMealsResults, ICategory, IMeal } from "@/model";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers["Content-type"] = "application/json";

export const getAllMeals = async (page: number): Promise<GetMealsResults> =>
  (await axios.get(`/meal?limit=12&page=${page}`)).data;

export const getMealsByCategory = async (
  id: string
): Promise<GetMealsResults> => (await axios.get(`/category/${id}/meals`)).data;

export const getAllCategories = async (): Promise<ICategory[]> =>
  (await axios.get("/category")).data.data;

export const getMealById = async (id: string): Promise<IMeal> =>
  (await axios.get(`/meal/${id}`)).data.data;

interface CreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export const createUser = async (input: CreateUser): Promise<number> => 
  (await axios.post("/auth/signup", input)).status;

export const verifyEmail = async (code: string): AxiosPromise => 
  (await axios.get(`/auth/verify/${code}`)).data
