import API from 'services/api';
import { store } from 'store/index';
import { setQuizes } from 'store/slices/createQuizSlice';

export const getMyQuizzes = async () => {
  const state = store.getState();
  if (!!state.createQuiz.myQuizes.length) return;

  const myQuizes = await API.getMyQuizes();
  store.dispatch(setQuizes(myQuizes));
};
