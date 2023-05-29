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
      const currentQuestions = state.questions;
      const updatedQuestions = currentQuestions.filter((_q, i) => i !== index);
      state.questions = updatedQuestions;
    },
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
    clearCreateQuizInput: () => {
      return { name: '', questions: [], activeQuestionIndex: 0 };
    },
    editQuestion: (
      state,
      action: { payload: { index: number; question: Question } },
    ) => {
      const currentQuestions = state.questions;
      const updatedQuestions = currentQuestions.map((q, i) =>
        i === action.payload.index ? action.payload.question : q,
      );
      state.questions = updatedQuestions;
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  setActiveQuestionIndex,
  clearCreateQuizInput,
  editQuestion,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
