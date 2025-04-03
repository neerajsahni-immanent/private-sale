// import { store } from "@/redux/store"; // Import your Redux store
import axios from "axios";

// const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
const BaseUrl ='https://api-partner.spheramarket.com/api/v1/'
// Create an instance of axios with a default base URL
const api = axios.create({
  baseURL: `${BaseUrl}`,
});

// Axios interceptor to add access token from Redux to request headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token')
    // store.getState().auth?.auth?.user?.token; // Get the token from Redux state
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
