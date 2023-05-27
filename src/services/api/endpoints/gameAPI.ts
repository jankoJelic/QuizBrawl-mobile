import httpClient from '../httpClient';

const { get, post } = httpClient;

const gameAPI = {
  startDailyEvent: async (id: number) => {
    const { data } = await get('/game/daily', { params: { id } });
    return data;
  },
};

export default gameAPI;
