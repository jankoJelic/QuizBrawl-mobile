import { Lobby, Room } from './dataSliceTypes';

export interface UserData {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  isAdmin: boolean;
  isEmailConfirmed: boolean;
  isPremium: boolean;
  lastName: string;
  password: string;
  refreshToken: string;
  registrationOtpCode: '';
  trophies: number;
  updatedAt: string;
  money: number;
  rank: number;
  avatar: string;
  color: string;
  lobby: Lobby;
  room: Room;
  level: number;
}
