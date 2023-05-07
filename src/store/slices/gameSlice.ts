import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'services/socket/socketPayloads';
import { UserData } from 'store/types/authSliceTypes';
import { Room } from 'store/types/dataSliceTypes';

export interface GameSlice {
  score: Record<string, number>;
  questions: Question[];
  onQuestion: number;
  activeRoom: Room;
  users: UserData[];
  type: 'brawl' | 'classic';
}

const initialState: GameSlice = {
  score: <Record<string, number>>{},
  questions: [],
  onQuestion: -1,
  activeRoom: <Room>{},
  users: [],
  type: 'brawl',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (
      state,
      action: {
        payload: { room: Room; questions: Question[] };
      },
    ) => {
      const { questions, room } = action.payload || {};
      state.questions = questions;
      state.activeRoom = room;

      let score = {};
      room.users.forEach((user: UserData) => {
        const userIdString = String(user.id);
        score[userIdString] = 0;
      });

      state.score = score;
      state.onQuestion = 0;
    },
    goToNextQuestion: state => {
      state.onQuestion++;
    },
    finishGame: state => {
      state.onQuestion = -1;
      state.activeRoom = {} as Room;
      state.users = [];
      state.questions = [];
      state.score = {};
    },
  },
});

export const { initializeGame } = gameSlice.actions;

export default gameSlice.reducer;
