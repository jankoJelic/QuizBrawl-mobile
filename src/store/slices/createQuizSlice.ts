import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'services/socket/socketPayloads';

export interface AppState {
  name: string;
  questions: Question[];
  activeQuestionIndex: number;
}

const initialState: AppState = {
  name: '',
  questions: [],
  activeQuestionIndex: 0,
};

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState,
  reducers: {
    addQuestion: (
      state,
      action: { payload: { question: Question; index: number } },
    ) => {
      const { question, index } = action.payload;
      const currentQuestions = state.questions;
      state.questions = currentQuestions.concat([question]);
      state.activeQuestionIndex = state.activeQuestionIndex + 1;
    },
    removeQuestion: (state, action: { payload: { index: number } }) => {
      const { index } = action.payload;
      const currentQuestions = state.questions.filter((_q, i) => i !== index);
      state.questions = currentQuestions;
      if (index > 0) state.activeQuestionIndex = state.activeQuestionIndex - 1;
    },
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
  },
});

export const { addQuestion, removeQuestion, setActiveQuestionIndex } =
  createQuizSlice.actions;

export default createQuizSlice.reducer;
