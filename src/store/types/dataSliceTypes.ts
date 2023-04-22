import { UserData } from './authSliceTypes';

export interface Lobby {
  id: number;
  playersCount: number;
  availableRoomsCount: number;
  topic: Topic;
  rooms: Room[];
}

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

