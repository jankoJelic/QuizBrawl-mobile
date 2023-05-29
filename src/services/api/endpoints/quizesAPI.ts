import { Question } from 'services/socket/socketPayloads';
import httpClient from '../httpClient';
import { Topic } from 'store/types/dataSliceTypes';
import { Quiz } from 'store/slices/createQuizSlice';

const { get, post, patch } = httpClient;

const quizesAPI = {
  getMyQuizes: async () => {
    const { data } = await get<Quiz[]>('/quizes');
    return data;
  },

  createQuiz: async (body: CreateQuizBody) => {
    const { data } = await post<Quiz>('/quizes/create', body);
    return data;
  },

  updateQuiz: async (quizId: number, body: CreateQuizBody) => {
    const { data } = await patch<Quiz>(`/quizes/quiz/${quizId}`, body);
    return data;
  },

  rateQuiz: async (id: number, like: boolean) => {
    patch(`/quizes/quiz/${id}/rate`, { like });
  },
};

export default quizesAPI;

interface CreateQuizBody {
  name: string;
  questions: Question[];
  answerTime: number;
  topic: Topic;
}
