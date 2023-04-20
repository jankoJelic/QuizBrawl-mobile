import axios from 'axios';
import { BASE_URL } from 'constants/env/envConstants';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use(handleAuthToken);
createAuthRefreshInterceptor(httpClient, failedRequest =>
  handleRefreshToken(httpClient, failedRequest),
);