import { authAPI } from './endpoints/authAPI';
import { lobbiesAPI } from './endpoints/lobbiesAPI';
import { questionsAPI } from './endpoints/questionsAPI';
import quizesAPI from './endpoints/quizesAPI';
import roomsAPI from './endpoints/roomsAPI';

const API = {
  ...authAPI,
  ...lobbiesAPI,
  ...quizesAPI,
  ...roomsAPI,
  ...questionsAPI
};

export default API;
