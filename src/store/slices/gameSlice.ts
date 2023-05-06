import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'services/socket/socketPayloads';
import { UserData } from 'store/types/authSliceTypes';
import { Room } from 'store/types/dataSliceTypes';

export interface GameSlice {
  score: Record<string, number>;
  questions: Question[];
  secondsLeft: number;
  onQuestion: number;
  activeRoom: Room;
}

const initialState: GameSlice = {
  score: <Record<string, number>>{},
  questions: [],
  secondsLeft: 15,
  onQuestion: -1,
  activeRoom: <Room>{},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (
      state,
      action: { payload: { room: Room; questions: Question[] } },
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
    finishGame: (state, action) => {
      state.onQuestion = -1;
    },
  },
});

export const { initializeGame } = gameSlice.actions;

export default gameSlice.reducer;
