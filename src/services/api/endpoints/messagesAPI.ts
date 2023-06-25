import { MessageType } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { destroy, post, get } = httpClient;

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

  sendNotification: async (body: SendNotificationBody) => {
    post('/messages/message', body);
  },
};

interface SendNotificationBody {
  title: string;
  recipientId: number;
  text: string;
  data: { type: MessageType; payload: string };
}
