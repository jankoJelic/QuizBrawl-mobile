import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IS_ANDROID } from 'constants/styles/appStyles';
import API from 'services/api';
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
    return;
  }

  const { idToken, user } = await GoogleSignin.signIn();
  const { email, name, photo } = user || {};


  await API.loginWithGoogle({
    email,
    googleAuthId: idToken as string,
    name: name as string,
    photo: photo as string,
  });
};
