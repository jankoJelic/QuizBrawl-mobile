import { authAPI } from './endpoints/authAPI';
import gameAPI from './endpoints/gameAPI';
import leaguesAPI from './endpoints/leaguesAPI';
import { lobbiesAPI } from './endpoints/lobbiesAPI';
import { messagesAPI } from './endpoints/messagesAPI';
import { questionsAPI } from './endpoints/questionsAPI';
import quizesAPI from './endpoints/quizesAPI';
import rewardsAPI from './endpoints/rewardsAPI';
import roomsAPI from './endpoints/roomsAPI';
import { usersAPI } from './endpoints/usersAPI';

const API = {
  ...authAPI,
  ...lobbiesAPI,
  ...quizesAPI,
  ...roomsAPI,
  ...questionsAPI,
  ...messagesAPI,
  ...usersAPI,
  ...rewardsAPI,
  ...gameAPI,
  ...leaguesAPI
};

export default API;
