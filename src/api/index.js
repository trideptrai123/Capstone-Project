import axios from "axios";
import { isTokenExpired, logout } from "../utils/helper";
import { HttpError } from "../error/HttpError";
export const LOCAL_STORAGE_KEY = {
  token: "token-uni-admin",
};
export const BASE_URL_DOWNLOAD = "http://localhost:7291/api";
export const API = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
