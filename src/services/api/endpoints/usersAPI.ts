import { UserData } from 'store/types/authSliceTypes';
import httpClient from '../httpClient';
import { Topic } from 'store/types/dataSliceTypes';

const { get, destroy, post } = httpClient;

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
    destroy('users/removeFriend', { params: { id } });
  },

  getFriends: async () => {
    const { data } = await get<Partial<UserData>[]>('/users/friends');
    return data;
  },

  registerAnswers: async (correct: boolean, topic: Topic) => {
    post('/users/registerAnswer', { correct, topic });
  },

  getLeaderboards: async () => {
    const { data } = await get('/users/leaderboards');
    return data;
  },

  getUserRank: async (userId: number) => {
    const { data } = await get(`/users/${userId}/rank`);
    return data;
  },
};
