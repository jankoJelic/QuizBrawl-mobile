import { createSlice } from '@reduxjs/toolkit';
import { CorrectAnswer, Question } from 'services/socket/socketPayloads';
import { UserData } from 'store/types/authSliceTypes';
import { Room } from 'store/types/dataSliceTypes';

export interface GameSlice {
  score: Record<string, number>;
  questions: Question[];
  onQuestion: number;
  activeRoom: Room;
  users: UserData[];
  type: 'brawl' | 'classic';
  selectedAnswers: CorrectAnswer[];
  answers: Record<string, CorrectAnswer>;
}

const initialState: GameSlice = {
  score: <Record<string, number>>{}, // score for ewach player {id: score}
  questions: [], // all questions for a game
  onQuestion: -1, // index of the active question
  activeRoom: <Room>{}, // room in which the game is being played
  users: [], // participants
  type: 'brawl',
  selectedAnswers: [], // answers selected for the active question so they can not be selected again (only for brawl?)
  answers: {}, // first answer for every question (for statistics) - it is being sent at the end of the game
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

      let answers = {};
      questions.forEach((question: Question) => {
        const questionIdString = String(question.id);
        answers[questionIdString] = '';
      });

      state.score = score;
      state.answers = answers;
      state.onQuestion = 0;
      state.type = room.type;
    },
    selectWrongQuestion: (
      state,
      action: { payload: SelectedAnswerPayload },
    ) => {
      const { answer, userId } = action.payload || {};
      const currentSelectedAnswers = state.selectedAnswers;

      if (!currentSelectedAnswers.length)
        state.answers[state.questions[state.onQuestion].id] = answer;

      if (state.type === 'brawl') {
        state.selectedAnswers = state.selectedAnswers.concat([answer]);
        const currentUserScore = state.score[userId];
        state.score[userId] = currentUserScore - 1;
      } else if (state.type === 'classic') {
      }
    },
    selectCorrectQuestion: (
      state,
      action: { payload: SelectedAnswerPayload },
    ) => {
      const { answer, userId } = action.payload || {};

      const currentSelectedAnswers = state.selectedAnswers;

      if (!currentSelectedAnswers.length)
        state.answers[state.questions[state.onQuestion].id] = answer;

      if (state.type === 'brawl') {
        const selectedAnswers = state.selectedAnswers;
        const currentUserScore = state.score[userId];

        const pointsWon = () => {
          switch (selectedAnswers.length) {
            case 0:
              return 3;
            case 1:
              return 2;
            case 2:
              return 1;
            default:
              return 0;
          }
        };

        state.selectedAnswers = selectedAnswers.concat([answer]);

        state.score[userId] = currentUserScore + pointsWon();
      } else if (state.type === 'classic') {
      }
    },
    goToNextQuestion: state => {
      const currentOnQuestion = state.onQuestion;
      state.onQuestion = currentOnQuestion + 1;
      state.selectedAnswers = [];
    },
    finishGame: state => {
      state.onQuestion = -1;
      state.activeRoom = {} as Room;
      state.users = [];
      state.questions = [];
      state.score = {};
      state.type = 'brawl';
      state.answers = {};
    },
  },
});

export const {
  initializeGame,
  selectCorrectQuestion,
  selectWrongQuestion,
  finishGame,
  goToNextQuestion,
} = gameSlice.actions;

export default gameSlice.reducer;

export interface SelectedAnswerPayload {
  answer: CorrectAnswer;
  userId: number;
}
