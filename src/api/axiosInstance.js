// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://calender.free.beeceptor.com', // Your Beeceptor base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
