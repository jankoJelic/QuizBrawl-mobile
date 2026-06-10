import { UserData } from "./authSliceTypes";

export interface Lobby {
  id: number;
  topic: Topic;
  rooms: Room[];
  name: LobbyName;
  users: UserData[];
}

export type LobbyName = "Arena" | "Cash game" | "Solo";

export interface Room {
  id: number;
  userId: number;
  name: string;
  users: UserData[];
  maxPlayers: number;
  questionsCount: number;
  topicId: number;
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
  | "general"
  | "history"
  | "music"
  | "sports"
  | "art"
  | "geography"
  | "showbiz"
  | "science"
  | "news";

export interface TopicData {
  id: number;
  name: Topic;
  iconKey: string;
}

export type GameType = "brawl" | "classic";

export type MessageType =
  | "REWARD"
  | "GAME_INVITE"
  | "LEAGUE_GAME_INVITE"
  | "FRIEND_REQUEST"
  | "JOIN_LEAGUE_REQUEST";

export interface Message {
  title: string;
  payload?: any;
  type: MessageType;
  senderId: number;
  createdAt: number;
  id: number;
  read: boolean;
}
