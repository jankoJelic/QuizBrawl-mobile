import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';
import { Reward, ShallowUser } from 'store/types/authSliceTypes';

const { get, post, destroy, patch } = httpClient;

const leaguesAPI = {
  createLeague: async (body: CreateLeagueBody) => {
    const { data } = await post<League>('/leagues/league', body);
    return data;
  },

  getLeague: async (id: number) => {
    const { data } = await get(`/leagues/league/${id}`);
    return data;
  },

  getMyLeagues: async () => {
    const { data } = await get<League[]>('/leagues/my');
    return data;
  },

  deleteLeague: async (id: number) => {
    destroy(`leagues/league/${id}`);
  },

  getLeagueImages: async () => {
    const { data } = await get<string[]>('/leagues/images');
    return data;
  },

  getAllLeagues: async () => {
    const { data } = await get('/leagues');
    return data;
  },

  addQuizToLeague: async (quizId: number, leagueId: number) => {
    const { data } = await patch(`leagues/${leagueId}/addQuiz/${quizId}`);
    return data;
  },

  addUserToLeague: async (userId: number, leagueId: number) => {
    const { data } = await patch(`leagues/${leagueId}/addUser/${userId}`);
    return data;
  },

  submitLeagueScore: async (
    leagueId: number,
    score: Record<number, number>,
  ) => {
    console.log('leagueId', leagueId);
    console.log('score', score);
    const { data } = await post(`/leagues/league/${leagueId}/score`, { score });
    return data;
  },

  leaveLeague: async (leagueId: number) => {
    await post(`/leagues/league/${leagueId}/leave`);
  },

  registerLeagueAnswer: async (leagueId: number, correct: boolean) => {
    post(`/leagues/league/${leagueId}/answer`);
  },
};

export default leaguesAPI;

export interface League {
  name: string;
  score: null | Record<number, number>;
  gamesPlayed: null | Record<number, number>;
  correctAnswers: null | Record<number, number>;
  totalAnswers: null | Record<number, number>;
  users: ShallowUser[];
  userId: number;
  createdAt: string;
  id: number;
  reward: null | Reward;
  bet: number;
  image: string;
  password: string;
  type: LeagueType;
  nextQuizUserId: number;
  readyUsers: number[];
  selectedQuizId: number;
}

export type LeagueType = 'ADMIN' | 'ROUND';

interface CreateLeagueBody {
  name: string;
  image: string;
  type: LeagueType;
  bet: number;
  password: string;
  reward?: Reward;
}
