import { authAPI } from './endpoints/authAPI';
import { lobbiesAPI } from './endpoints/lobbiesAPI';
import quizesAPI from './endpoints/quizesAPI';
import roomsAPI from './endpoints/roomsAPI';

const API = {
  ...authAPI,
  ...lobbiesAPI,
  ...quizesAPI,
  ...roomsAPI,
};

export default API;
