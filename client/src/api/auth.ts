import { axiosClient } from "./axios";
import { LoginResponse } from "@/model";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export const createUser = async (input: CreateUser): Promise<number> =>
  (await axiosClient.post("/auth/signup", input)).status;

export const verifyEmail = async (code: string): Promise<LoginResponse> =>
  (await axiosClient.get(`/auth/verify/${code}`)).data;

interface loginUser {
  email: string;
  password: string;
}
export const login = async (input: loginUser): Promise<LoginResponse> =>
  (await axiosClient.post("/auth/login", input)).data;

// export const refreshAccessToken = async (): Promise<LoginResponse> =>
//   (await axiosClient.get("/auth/refresh")).data;

// export const logout = async (): Promise<void> =>
//   (await axiosClient.get("/auth/logout")).data;
