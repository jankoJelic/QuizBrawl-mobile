import { UserData } from 'store/types/authSliceTypes';
import { Room, Topic } from 'store/types/dataSliceTypes';

export interface UserJoinedLobbyPayload {
  lobbyId: number;
  user: UserData;
}

export interface UserJoinedRoomPayload {
  room: Room;
  user: UserData;
}

export type CorrectAnswer = 'answer1' | 'answer2' | 'answer3' | 'answer4';

export interface Question {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: CorrectAnswer;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  image?: string;
  topic: Topic;
  id: number;
}
