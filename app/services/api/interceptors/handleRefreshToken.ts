import { AxiosInstance } from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';
import { BASE_URL } from 'constants/env/envConstants';

interface AxiosAuthRefreshInstance extends AxiosInstance {
  post: (
    url: string,
    data?: any,
    config?: AxiosAuthRefreshRequestConfig | undefined,
  ) => Promise<any>;
}

const handleRefreshToken = async (
  httpClient: AxiosAuthRefreshInstance,
  failedRequest: any,
) => {
  try {
    const {
      data: { accessToken, refreshToken },
    } = await httpClient.post(
      `${BASE_URL}auth/refreshToken`,
      {},
      {
        headers: {
          RefreshToken: true,
        },
        skipAuthRefresh: true,
      },
    );

    await storeTokens(accessToken, refreshToken);

    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + accessToken;

    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
  }
};

export default handleRefreshToken;
