import httpClient from '../httpClient';

const { get, post } = httpClient;

const rewardsAPI = {
  registerArenaGameScore: async (score: Record<number, number>) => {
    const { data } = await post('/rewards/arena/score', score);
    return data;
  },
};

export default rewardsAPI;
