import axios from 'axios';
import { BASE_URL } from 'constants/env/envConstants';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import handleAccessToken from './interceptors/handleAccessToken';
import handleRefreshToken from './interceptors/handleRefreshToken';

const httpClient = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(handleAccessToken);
createAuthRefreshInterceptor(httpClient, failedRequest =>
  handleRefreshToken(httpClient, failedRequest),
);

const { get, post, put, delete: destroy, patch } = httpClient;

export default { get, post, put, destroy, patch };
