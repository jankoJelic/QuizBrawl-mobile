import { store } from 'store/index';
import httpClient from '../httpClient';
import { storeUserData } from 'store/slices/dataSlice';
import { UserData } from 'store/types/authSliceTypes';

const { post, get, patch } = httpClient;

export const authAPI = {
  registerUser: async (body: RegisterBody) => {
    const { data } = await post<AccessTokens>('/auth/register', body);

    return data;
  },

  loginUser: async (body: { email: string; password: string }) => {
    const { data } = await post<AccessTokens>('/auth/login', body);

    return data;
  },

  getPinEncryptionKey: async (body: { deviceId: string; pin: string }) => {
    const { data } = await post<string>('/auth/pin', body);
    return data;
  },

  getUserData: async () => {
    const { data } = await get('/auth/me');
    store.dispatch(storeUserData(data));
    return data;
  },

  updateUser: async (body: Partial<UserData>) => {
    const { data } = await patch('/auth/updateUser', body);

    return data;
  },
};

interface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AccessTokens {
  accessToken: string;
  refreshToken: string;
}
