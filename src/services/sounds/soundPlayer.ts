import SoundPlayer from 'react-native-sound-player';

export const playSound = (sound: Sound) => {
  try {
    SoundPlayer.playSoundFile(sound, 'mp3');
  } catch (error) {}
};

type Sound = 'success' | 'error' | 'notification' | 'reward' | 'defeat';
