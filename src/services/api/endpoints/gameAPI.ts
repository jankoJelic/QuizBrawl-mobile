import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { get, post } = httpClient;

const gameAPI = {
  startDailyEvent: async (id: number) => {
    const { data } = await get('/game/daily', { params: { id } });
    return data;
  },

  registerAnswer: async (correct: boolean, topic: Topic) => {
    post('/game/answer', { correct, topic });
  },
};

export default gameAPI;
