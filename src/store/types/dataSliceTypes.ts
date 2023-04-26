import { UserData } from './authSliceTypes';

export interface Lobby {
  id: number;
  playersCount: number;
  availableRoomsCount: number;
  topic: Topic;
  rooms: Room[];
  name: LobbyName;
}

export type LobbyName = 'Arena' | '1v1' | 'Solo';

export interface Room {
  id: number;
  userId: number;
  hostName: string;
  name: string;
  players: UserData[];
  maxPlayers: number;
  questionsCount: number;
  topic: Topic;
  type: GameType;
  password: string;
  lobby: Lobby;
}

export type Topic =
  | 'General'
  | 'History'
  | 'Music'
  | 'Sports'
  | 'Art'
  | 'Geography'
  | 'Showbiz';

export type GameType = 'BRAWL' | 'CLASSIC';
