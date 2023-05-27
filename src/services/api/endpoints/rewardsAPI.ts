import httpClient from '../httpClient';

const { get, post } = httpClient;

const rewardsAPI = {
  registerArenaGameScore: async (score: Record<number, number>) => {
    const { data } = await post<number>('/rewards/arena/score', score);
    return data;
  },

  registerDailyScore: async (dailyId: number, score: number) => {
    const { data } = await post('/rewards/solo/daily', { dailyId, score });
    return data;
  },
};

export default rewardsAPI;
