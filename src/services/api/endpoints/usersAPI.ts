import { UserData } from 'store/types/authSliceTypes';
import httpClient from '../httpClient';

const { get } = httpClient;

export const usersAPI = {
  getUser: async (id: string) => {
    const { data } = await get<Partial<UserData>>('/users/user', {
      params: { id },
    });

    return data;
  },
};
