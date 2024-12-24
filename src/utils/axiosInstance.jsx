import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for local storage
import { generateHMAC } from '.';

const axiosInstance = axios.create({
  baseURL: 'https://backend.gamocrat.com', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios interceptor for adding HMAC and token headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Generate HMAC, nonce, and timestamp
      const { hmac, nonce, timestamp } = await generateHMAC();

      // Retrieve token from AsyncStorage
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjY0ZGNmNDU3OWFmOTBmNmU4ZTkxODcwIGU2OTdmNzlhZDZkNTViOGU4YzhmMGI3MDhhYjE1NzQwOTE4ZTI2MzQiLCJpYXQiOjE3MzQ0NjMyNzgsImV4cCI6MTczNDYzNjA3OH0.VrSCnGLIj5VCSvUjJce_b8NQsmBtfht9bKgAibCCW6Y";

      // Set HMAC headers
      config.headers['x-hmac-signature'] = hmac;
      config.headers['x-nonce'] = nonce;
      config.headers['x-timestamp'] = timestamp;

      // Set Authorization header if token exists
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error generating HMAC or retrieving token:', error);
      throw error;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
