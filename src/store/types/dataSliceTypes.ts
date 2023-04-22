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
}

export type Topic =
  | 'GENERAL'
  | 'HISTORY'
  | 'MUSIC'
  | 'SPORTS'
  | 'ART'
  | 'GEOGRAPHY'
  | 'SHOWBIZ';

export type GameType = 'BRAWL' | 'CLASSIC';
