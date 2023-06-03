import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';
import { Reward, ShallowUser } from 'store/types/authSliceTypes';

const { get, post, destroy, patch } = httpClient;

const leaguesAPI = {
  createLeague: async (id: number) => {
    const { data } = await get<League>('/leagues/daily', { params: { id } });
    return data;
  },

  getMyLeagues: async () => {
    const { data } = await get<League[]>('/leagues/my');
    return data;
  },

  deleteLeagues: async (id: number) => {
    destroy(`leagues/${id}`);
  },

  getLeagueImages: async () => {
    const { data } = await get<string[]>('/leagues/images');
    return data;
  },

  
};

export default leaguesAPI;

export interface League {
  name: string;
  score: null | Record<number, number>;
  gamesPlayed: null | Record<number, number>;
  users: ShallowUser[] | null;
  userId: number;
  createdAt: string;
  id: number;
  reward: null | Reward;
  bet: number;
}
