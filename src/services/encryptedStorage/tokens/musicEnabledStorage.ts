import { store } from 'store/index';
import ENCRYPTED_STORAGE from '..';
import { setMusicEnabled } from 'store/slices/authSlice';

const turnMusicOff = () => {
  store.dispatch(setMusicEnabled(false));
  ENCRYPTED_STORAGE.storeValue('musicEnabled', 'false');
};

const turnMusicOn = () => {
  store.dispatch(setMusicEnabled(true));
  ENCRYPTED_STORAGE.storeValue('musicEnabled', 'true');
};

export const checkMusicEnabled = async () => {
  const musicEnabled = await ENCRYPTED_STORAGE.getValue('musicEnabled');
  if (musicEnabled === 'false') {
    turnMusicOff();
  }
};

export const toggleMusicEnabled = () => {
  const state = store.getState();
  const { musicEnabled } = state.auth;
  if (musicEnabled) {
    turnMusicOff();
  } else {
    turnMusicOn();
  }
};
