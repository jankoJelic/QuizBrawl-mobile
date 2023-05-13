import { store } from 'store/index';
import httpClient from '../httpClient';
import { storeUserData } from 'store/slices/dataSlice';
import { UserData } from 'store/types/authSliceTypes';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';

const { post, get, patch } = httpClient;

export const authAPI = {
  registerUser: async (body: RegisterBody) => {
    const {
      data: { accessToken, refreshToken },
    } = await post<AccessTokens>('/auth/register', body);
    await storeTokens(accessToken, refreshToken);
  },

  loginUser: async (body: { email: string; password: string }) => {
    const {
      data: { accessToken, refreshToken },
    } = await post<AccessTokens>('/auth/login', body);
    await storeTokens(accessToken, refreshToken);
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

  loginWithGoogle: async (body: GoogleAuthBody) => {
    const {
      data: { accessToken, refreshToken },
    } = await post<AccessTokens>('/auth/google', body);
    await storeTokens(accessToken, refreshToken);
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

interface GoogleAuthBody {
  email: string;
  photo: string;
  name: string;
  googleAuthId: string;
}
