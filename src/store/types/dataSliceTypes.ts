import { UserData } from './authSliceTypes';

export interface Lobby {
  id: number;
  topic: Topic;
  rooms: Room[];
  name: LobbyName;
  users: UserData[];
}

export type LobbyName = 'Arena' | 'Cash game' | 'Solo';

export interface Room {
  id: number;
  userId: number;
  name: string;
  users: UserData[];
  maxPlayers: number;
  questionsCount: number;
  topic: Topic;
  type: GameType;
  password: string;
  lobbyId: number;
  answerTime: number;
  readyUsers: number[];
  teams: { players: number[] }[];
  bet?: number;
  hostName: string;
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

export type MessageType =
  | 'REWARD'
  | 'GAME_INVITE'
  | 'FRIEND_REQUEST'
  | 'JOIN_LEAGUE_REQUEST';

export interface Message {
  title: string;
  payload?: any;
  type: MessageType;
  senderId: number;
  createdAt: number;
  id: number;
  read: boolean;
}
