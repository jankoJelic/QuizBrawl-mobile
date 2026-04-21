import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import handleAccessToken from './interceptors/handleAccessToken';
import handleRefreshToken from './interceptors/handleRefreshToken';
import { BASE_URL } from 'constants/env/envConstants';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(handleAccessToken);
httpClient.interceptors.response.use(
  response => response,
  error => {
    const { config, response } = error;
    console.error(
      `[API Error] ${config?.method?.toUpperCase()} ${config?.url} → ${response?.status}`,
      response?.data ?? error.message,
    );
    return Promise.reject(error);
  },
);
createAuthRefreshInterceptor(httpClient, failedRequest =>
  handleRefreshToken(httpClient, failedRequest),
);

const { get, post, put, delete: destroy, patch } = httpClient;

export default { get, post, put, destroy, patch };
