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
  hostName: string;
  name: string;
  users: UserData[];
  maxPlayers: number;
  questionsCount: number;
  topic: Topic;
  type: GameType;
  password: string;
  lobby: Lobby;
  answerTime: number;
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

export type GameType = 'BRAWL' | 'CLASSIC';
