import { authAPI } from './endpoints/authAPI';
import { lobbiesAPI } from './endpoints/lobbiesAPI';
import { messagesAPI } from './endpoints/messagesAPI';
import { questionsAPI } from './endpoints/questionsAPI';
import quizesAPI from './endpoints/quizesAPI';
import roomsAPI from './endpoints/roomsAPI';
import { usersAPI } from './endpoints/usersAPI';

const API = {
  ...authAPI,
  ...lobbiesAPI,
  ...quizesAPI,
  ...roomsAPI,
  ...questionsAPI,
  ...messagesAPI,
  ...usersAPI
};

export default API;
