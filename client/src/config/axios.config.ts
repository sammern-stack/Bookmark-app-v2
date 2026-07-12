import type { AxiosRequestConfig } from "axios";
import qs from "qs";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
};
