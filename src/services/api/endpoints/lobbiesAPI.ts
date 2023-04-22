import httpClient from '../httpClient';

const { get } = httpClient;

export const lobbiesAPI = {
  getLobbies: async () => {
    const { data } = await get('/lobbies');

    return data;
  },
};

