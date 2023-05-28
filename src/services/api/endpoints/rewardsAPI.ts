import { Reward } from 'store/types/authSliceTypes';
import httpClient from '../httpClient';

const { get, post } = httpClient;

const rewardsAPI = {
  registerArenaGameScore: async (score: MultiplayerGameScore) => {
    const { data } = await post<number>('/rewards/arena/score', score);
    return data;
  },

  registerDailyScore: async (dailyId: number, score: number) => {
    const { data } = await post<RegisterCashScoreResponse>(
      '/rewards/solo/daily',
      { dailyId, score },
    );
    return data;
  },

  registerCashGameScore: async (
    roomId: number,
    score: MultiplayerGameScore,
  ) => {
    const { data } = await post<RegisterCashScoreResponse>(
      '/rewards/cash/score',
      { score, roomId },
    );
    return data;
  },
};

export default rewardsAPI;

export type MultiplayerGameScore = Record<number, number>;

interface RegisterCashScoreResponse {
  money: number;
  reward?: Reward;
}
