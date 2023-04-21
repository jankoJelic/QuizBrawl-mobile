import axios from 'axios';
import { BASE_URL } from 'constants/env/envConstants';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import handleAccessToken from './interceptors/handleAccessToken';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use(handleAccessToken);
createAuthRefreshInterceptor(httpClient, failedRequest =>
  handleRefreshToken(httpClient, failedRequest),
);

const { get, post, put, delete: destroy, patch } = httpClient;

export default { get, post, put, destroy, patch };
