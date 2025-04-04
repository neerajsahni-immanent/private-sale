import axios from "axios";
import api from "./api";
import { store } from "@/redux/store";
const BaseUrl = 'http://localhost:8040/api/';
// const accessToken = localStorage.getItem('accessToken');
// const refreshToken = localStorage.getItem('refreshToken')
// const accessToken = store.getState().auth?.auth?.user?.token;
// const refreshToken = store.getState().auth?.auth?.user?.refreshToken;
export const postDataAPI = async (url, data) => {
  const res = await api.post(url, data, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res;
};
export const postDataAPIForRefreshToken = async (url, data) => {
  const res = await api.post(url, data, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
  });
  return res;
};


export const putDataAPI = async (url, data) => {
  const res = await api.put(url, data, {
    withCredentials: true,
  });
  return res;
};
export const getDataAPI = async (url) => {
  const res = await api.get(url);
  return res;
};
export const getDataAPIWthAuth = async (url) => {
  const res = await api.get(url);
  return res;
};
export const postDataAPIWthAuth = async (url, data) => {
  const res = await api.post(url, data);
  return res;
};

export const postDataApiMultiForm = async (url, data) => {
  const accessToken = store.getState().auth?.auth?.user?.token;
  const res = await axios.post(`${BaseUrl}${url}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
