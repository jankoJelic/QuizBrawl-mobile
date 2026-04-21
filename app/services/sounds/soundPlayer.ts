import SoundPlayer from 'react-native-sound-player';
import { store } from 'store/index';

export const playSound = (sound: Sound) => {
  try {
    const state = store.getState();
    if (!state.auth.musicEnabled) return;
    SoundPlayer.playSoundFile(sound, 'mp3');
  } catch (error) {}
};

type Sound = 'success' | 'error' | 'notification' | 'reward' | 'defeat';
