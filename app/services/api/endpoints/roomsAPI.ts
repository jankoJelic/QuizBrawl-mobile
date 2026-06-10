import { Lobby, Room } from "store/types/dataSliceTypes";
import httpClient from "../httpClient";

const { get, post, destroy, patch } = httpClient;

const roomsAPI = {
  createRoom: async (body: CreateRoomBody) => {
    const { data } = await post<Room>("rooms/create", body);

    return data;
  },

  getRooms: async (params?: GetRoomsParams) => {
    const { data } = await get<Room[]>("rooms", { params });

    return data;
  },

  deleteRoom: async (roomId: number) => {
    await destroy("rooms/delete", { params: { roomId } });
  },

  updateRoom: async (roomId: number) => {
    const { data } = await patch("rooms", { params: { roomId } });
    return data;
  },
};

export default roomsAPI;

export interface CreateRoomBody {
  name: string;
  maxPlayers: number;
  answerTime: number;
  topicId: number;
  lobbyId: number;
  questionsCount?: number;
  readyUsers: number[];
  bet?: number;
}

export interface GetRoomsParams {
  lobbyId?: number;
  topicId?: number;
}
