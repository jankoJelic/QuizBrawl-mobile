import { store } from 'store/index';
import httpClient from '../httpClient';
import { storeUserData } from 'store/slices/dataSlice';
import { UserData } from 'store/types/authSliceTypes';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';

const { post, get, patch, destroy } = httpClient;

const initialTotalAnswers = {
  General: 0,
  Sports: 0,
  Music: 0,
  History: 0,
  Geography: 0,
  Showbiz: 0,
  Art: 0,
  Science: 0,
};

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
    store.dispatch(
      storeUserData({
        ...data.userData,
        ...(!data.userData.totalAnswers && {
          totalAnswers: initialTotalAnswers,
        }),
        ...((!data.userData.correctAnswers ||
          !data.userData.correctAnswers?.General) && {
          correctAnswers: initialTotalAnswers,
        }),
      }),
    );
    storeTokens(data.accessToken, data.refreshToken);

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

  logoutUser: async () => {
    await post('/auth/logout');
  },

  connectToFCM: async (fcmToken: string) => {
    get('/messages/fcmToken', { params: { fcmToken } });
  },

  deleteUser: async (password: string) => {
    const { data } = await destroy<boolean>(`/auth/${password}`);
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

interface GoogleAuthBody {
  email: string;
  photo: string;
  name: string;
  googleAuthId: string;
}
