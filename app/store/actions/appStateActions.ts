import { store } from 'store/index';
import { showToast } from 'store/slices/appStateSlice';

export const showOoopsToast = () => {
  store.dispatch(
    showToast({ text: 'Ooops, something went wrong', type: 'error' }),
  );
};

export const showSuccessToast = () => {
  store.dispatch(showToast({ text: 'Success!', type: 'success' }));
};
