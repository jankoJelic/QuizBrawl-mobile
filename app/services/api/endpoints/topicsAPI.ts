import httpClient from '../httpClient';

const { get } = httpClient;

export const topicsAPI = {
  getTopics: async () => {
    const { data } = await get('/topics');
    return data as { id: number; name: string; iconKey: string }[];
  },
};
