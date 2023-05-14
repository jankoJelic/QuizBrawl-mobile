import ENCRYPTED_STORAGE from '..';

export const storeTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  await ENCRYPTED_STORAGE.storeValue('accessToken', accessToken);
  await ENCRYPTED_STORAGE.storeValue('refreshToken', refreshToken);
};

export const getAccessToken = async () => {
  return await ENCRYPTED_STORAGE.getValue('accessToken');
};

export const getRefreshToken = async () => {
  return await ENCRYPTED_STORAGE.getValue('refreshToken');
};

export const deleteTokens = () => {
  ENCRYPTED_STORAGE.removeValue('accessToken').catch(() => {});
  ENCRYPTED_STORAGE.removeValue('refreshToken').catch(() => {});
};
