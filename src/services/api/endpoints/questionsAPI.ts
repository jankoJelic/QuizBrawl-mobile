import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { get } = httpClient;

export const questionsAPI = {
  getQuestions: async (params: GetQuestionsParams) => {
    const { data } = await get('/questions', { params });

    return data;
  },
};

interface GetQuestionsParams {
  topic?: Topic;
  count?: number;
}
