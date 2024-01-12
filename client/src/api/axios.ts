import axios from "axios";

const BASE_URL = "https://food-delivery-2arj.onrender.com/api/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export const axiosClientWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
