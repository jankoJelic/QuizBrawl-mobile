import { Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { get, post } = httpClient;

const roomsAPI = {
  createRoom: async (body: CreateRoomBody) => {
    const { data } = await post('rooms/createRoom', body);

    return data;
  },
};

export default roomsAPI;

interface CreateRoomBody {
  name: string;
  maxPlayers: number;
  answerTime: number;
  topic: Topic;
}

interface CreateRoomResponse {}
