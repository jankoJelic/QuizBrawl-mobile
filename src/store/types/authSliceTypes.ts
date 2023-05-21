import { Lobby, Message, Room, Topic } from './dataSliceTypes';

export interface UserData extends ShallowUser {
  createdAt: string;
  isEmailConfirmed: boolean;
  password: string;
  refreshToken: string;
  registrationOtpCode: '';
  updatedAt: string;
  money: number;
  lobby: Lobby;
  room: Room;
  avatars: string[];
  inbox: Message[] | null;
}

export interface ShallowUser {
  email: string;
  id: number;
  isAdmin: string;
  isBanned: boolean;
  isPremium: boolean;
  trophies: number;
  firstName: string;
  lastName: string;
  level: number;
  rank: string;
  accuracyPercentage: number;
  favouriteTopic: Topic;
  avatar: string;
  isOnline: boolean;
  totalAnswers: number;
  correctAnswers: number;
  friends: number[] | ShallowUser[];
  color: string;
}
