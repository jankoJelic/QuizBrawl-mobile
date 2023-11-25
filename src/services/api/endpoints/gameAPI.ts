import { Room, Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';
import { Question } from 'services/socket/socketPayloads';

const { get, post } = httpClient;

const gameAPI = {
  startDailyEvent: async (id: number) => {
    const { data } = await get('/game/daily', { params: { id } });
    return data;
  },

  registerAnswer: async (correct: boolean, topic: Topic) => {
    post('/game/answer', { correct, topic });
  },

  startQuickGame: async () => {
    const { data } = await get<{ room: Room; questions: Question[] }>(
      '/game/quick',
    );
    return data;
  },
};

export default gameAPI;
