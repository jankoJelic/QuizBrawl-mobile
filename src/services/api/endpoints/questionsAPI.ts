import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';
import { CorrectAnswer } from 'services/socket/socketPayloads';

const { get, patch } = httpClient;

export const questionsAPI = {
  getQuestions: async (params: GetQuestionsParams) => {
    const { data } = await get('/questions', { params });

    return data;
  },

  updateQuestionStats: async (body: Record<string, CorrectAnswer>) => {
    const { data } = await patch('/questions/stats', body);
    return data;
  },
};

interface GetQuestionsParams {
  topic?: Topic;
  count?: number;
}
