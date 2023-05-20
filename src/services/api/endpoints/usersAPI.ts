import { UserData } from 'store/types/authSliceTypes';
import httpClient from '../httpClient';

const { get, destroy } = httpClient;

export const usersAPI = {
  getUser: async (id: string) => {
    const { data } = await get<Partial<UserData>>('/users/user', {
      params: { id },
    });
    return data;
  },

  getMyAvatars: async () => {
    const { data } = await get<string[]>('/users/avatars');
    return data;
  },

  removeFriend: (id: number) => {
    destroy('/users/removeFriend', { params: { id } });
  },

  getFriends: async () => {
    const { data } = await get<Partial<UserData>[]>('/users/friends');
    console.log(data?.length);
    return data;
  },
};
