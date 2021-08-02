import {http} from './base';
import {
  signInDto,
  signInResponse,
  CreateUserDto,
  ValidateUserDto,
} from '../types/auth-type';

const url = '/auth';

export const authAPIS = {
  signIn: async (data: signInDto): Promise<signInResponse> => {
    const response = await http.post(`${url}/signIn`, data);
    return response.data;
  },

  signUp: async (data: CreateUserDto): Promise<void> => {
    const response = await http.post(`${url}/signUp`, data);
    return response.data;
  },

  validateUser: async (data: ValidateUserDto): Promise<void> => {
    const response = await http.post(`${url}/validateUser`, data);
    return response.data;
  },
};
