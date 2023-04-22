import { AxiosRequestConfig } from 'axios';
import ENCRYPTED_STORAGE from 'services/encryptedStorage';

const handleAccessToken = async (request: AxiosRequestConfig) => {
  const accessToken = request?.headers?.RefreshToken
    ? await ENCRYPTED_STORAGE.getValue('accessToken')
    : await ENCRYPTED_STORAGE.getValue('refreshToken');

  if (!!accessToken) request.headers['Authorization'] = `Bearer ${accessToken}`;

  return request;
};

export default handleAccessToken;
