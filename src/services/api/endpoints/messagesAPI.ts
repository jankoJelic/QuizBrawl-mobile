import httpClient from '../httpClient';

const { destroy, patch, get } = httpClient;

export const messagesAPI = {
  deleteMessage: async (id: string) => {
    const { data } = await destroy('/messages/message', { params: { id } });
    return data;
  },

  readMessage: (id: number) => {
    get('/messages/message/read', { params: { id } });
  },

  getMyMessages: async () => {
    const { data } = await get('/messages');
    return data;
  },
};
