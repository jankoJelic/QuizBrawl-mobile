import { Lobby, Room, Topic } from 'store/types/dataSliceTypes';
import httpClient from '../httpClient';

const { get, post, destroy, patch } = httpClient;

const roomsAPI = {
  createRoom: async (body: CreateRoomBody) => {
    const { data } = await post<Room>('rooms/create', body);

    return data;
  },

  getRooms: async () => {
    const { data } = await get<Room[]>('rooms');

    return data;
  },

  deleteRoom: async (roomId: number) => {
    await destroy('rooms/delete', { params: { roomId } });
  },

  updateRoom: async (roomId: number) => {
    const { data } = await patch('rooms', { params: { roomId } });
    return data;
  },
};

export default roomsAPI;

interface CreateRoomBody {
  name: string;
  maxPlayers: number;
  answerTime: number;
  topic: Topic;
  lobby: Lobby;
  questionsCount?: number;
  readyUsers: number[];
}
