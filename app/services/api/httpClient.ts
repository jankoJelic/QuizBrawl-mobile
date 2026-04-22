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

httpClient.interceptors.request.use(config => {
  if (__DEV__) (config as any).metadata = { startTime: Date.now() };
  return handleAccessToken(config);
});

httpClient.interceptors.response.use(
  response => {
    if (__DEV__) {
      const ms = Date.now() - (response.config as any).metadata?.startTime;
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status} (${ms}ms)`,
        response.data,
      );
    }
    return response;
  },
  error => {
    const { config, response } = error;
    if (__DEV__) {
      const ms = Date.now() - (config as any)?.metadata?.startTime;
      console.error(
        `[API] ${config?.method?.toUpperCase()} ${config?.url} → ${response?.status} (${ms}ms)`,
        response?.data ?? error.message,
      );
    }
    return Promise.reject(error);
  },
);
createAuthRefreshInterceptor(httpClient, failedRequest =>
  handleRefreshToken(httpClient, failedRequest),
);

const { get, post, put, delete: destroy, patch } = httpClient;

export default { get, post, put, destroy, patch };
