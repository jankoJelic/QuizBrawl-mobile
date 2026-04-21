import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IS_ANDROID } from 'constants/styles/appStyles';
import { store } from 'store/index';
import { showToast } from 'store/slices/appStateSlice';

export const signInWithGoogle = async () => {
  const isPlayServiceAvailable = await GoogleSignin.hasPlayServices();
  if (IS_ANDROID) await GoogleSignin.signOut();

  if (!isPlayServiceAvailable) {
    store.dispatch(
      showToast({
        text: "You don't have Play services supported on device",
        type: 'error',
      }),
    );
    throw new Error('Play services not available');
  }

  const { idToken, user } = await GoogleSignin.signIn();
  const { email, name, photo } = user || {};

  return {
    email,
    googleAuthId: idToken as string,
    name: name as string,
    photo: photo as string,
  };
};
