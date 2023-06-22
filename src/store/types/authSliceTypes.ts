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
  rewards: Reward[];
  achievements: Reward[];
  correctAnswers: Record<Topic, number>;
  totalAnswers: Record<Topic, number>;
  dailies: null | {};
  leagueIds: number[];
}

export interface ShallowUser {
  // data in JWT token
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
  totalAnswers: Record<Topic, number>;
  correctAnswers: Record<Topic, number>;
  friends: number[] | ShallowUser[]; // in JWT it is number[] and then we fetch the rest
  color: string;
}

export interface Reward {
  name?: string;
  image?: string;
  description?: string;
  payload: string;
  type: RewardType;
}

export type RewardType = 'AVATAR' | 'ACHIEVEMENT' | 'MEDAL';
