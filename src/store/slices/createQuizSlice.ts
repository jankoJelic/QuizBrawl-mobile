import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'services/socket/socketPayloads';

export interface AppState {
  name: string;
  questions: Question[];
}

const initialState: AppState = {
  name: '',
  questions: [],
};

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState,
  reducers: {
    addQuestion: (
      state,
      action: { payload: { question: Question; index: number } },
    ) => {
        const { question,index} = action.payload
      const currentQuestions = state.questions;
      const updatedQuestions = currentQuestions.concat([q]);
      state.questions = updatedQuestions;
    },
    removeQuestion: state => {},
  },
});

export const { login, logout } = createQuizSlice.actions;

export default createQuizSlice.reducer;
