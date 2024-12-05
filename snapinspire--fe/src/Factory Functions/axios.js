import axios from "axios"
import { getToken } from "./tokenManagement"
const BASE_URL = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL:BASE_URL
})

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
  
  export default axiosInstance;
