import axios from "axios";

const instance = axios.create({
  baseURL: "https://luxury-hotel-60c7b53289ed.herokuapp.com/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
