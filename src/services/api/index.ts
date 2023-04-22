import { authAPI } from './endpoints/authAPI';
import { lobbiesAPI } from './endpoints/lobbiesAPI';

const API = {
  ...authAPI,
  ...lobbiesAPI,
};

export default API;
