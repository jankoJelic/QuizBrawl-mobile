import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'services/socket/socketPayloads';
import { Topic } from 'store/types/dataSliceTypes';

export interface AppState {
  name: string;
  questions: Question[];
  activeQuestionIndex: number;
  myQuizes: Quiz[];
}

const initialState: AppState = {
  name: '',
  questions: [],
  activeQuestionIndex: 0,
  myQuizes: [],
};

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState,
  reducers: {
    addQuestion: (state, action: { payload: { question: Question } }) => {
      const { question } = action.payload;
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
    clearCreateQuizInput: state => {
      state.name = '';
      state.questions = [];
      state.activeQuestionIndex = 0;
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
    setQuizes: (state, action) => {
      state.myQuizes = action.payload;
    },
    addQuiz: (state, action: { payload: Quiz }) => {
      const currentQuizes = state.myQuizes;
      const updatedQuizes = currentQuizes.concat([action.payload]);
      state.myQuizes = updatedQuizes;
    },
    deleteQuiz: (state, action: { payload: number }) => {
      const currentQuizes = state.myQuizes;
      const updatedQuizes = currentQuizes.filter(q => q.id !== action.payload);
      state.myQuizes = updatedQuizes;
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  setActiveQuestionIndex,
  clearCreateQuizInput,
  editQuestion,
  deleteQuiz,
  addQuiz,
  setQuizes,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;

export interface Quiz {
  name: string;
  questions: Question[];
  answerTime: number;
  topic: Topic;
  id: number;
}
