import { Message } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { destroy, patch } = httpClient;

export const messagesAPI = {
  deleteMessage: async (id: string) => {
    const { data } = await destroy('/messages/message', { params: { id } });
    return data;
  },

  respondToFriendRequest: async (message: Message, response: boolean) => {
    const { data } = await patch('/messages/friendRequest', {
      response,
      message,
    });
    return data;
  },
};
