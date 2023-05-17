import { UserData } from './authSliceTypes';

export interface Lobby {
  id: number;
  topic: Topic;
  rooms: Room[];
  name: LobbyName;
  users: UserData[];
}

export type LobbyName = 'Arena' | '1v1' | 'Solo';

export interface Room {
  id: number;
  userId: number;
  admin: UserData;
  name: string;
  users: UserData[];
  maxPlayers: number;
  questionsCount: number;
  topic: Topic;
  type: GameType;
  password: string;
  lobby: Lobby;
  answerTime: number;
  readyUsers: number[];
}

export type Topic =
  | 'General'
  | 'History'
  | 'Music'
  | 'Sports'
  | 'Art'
  | 'Geography'
  | 'Showbiz'
  | 'Science';

export type GameType = 'brawl' | 'classic';

export interface Message {
  title: string;
  payload?: any;
  type: 'REWARD' | 'GAME_INVITE' | 'FRIEND_REQUEST';
  senderId: number;
  createdAt: number;
  id: string;
}
