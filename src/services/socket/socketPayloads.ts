import { UserData } from 'store/types/authSliceTypes';

export interface UserJoinedLobbyPayload {
  lobbyId: number;
  user: UserData;
}

export interface UserJoinedRoomPayload {
  roomId: number;
  user: UserData;
}