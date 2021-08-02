import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'http://localhost:3000';

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setClientToken = (token: string) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getConfig = async () => {
  const token = await AsyncStorage.getItem('@token');
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};
