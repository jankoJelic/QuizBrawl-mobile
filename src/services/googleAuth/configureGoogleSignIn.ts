import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GOOGLE_OAUTH_IOS_CLIENT_ID,
  GOOGLE_OAUTH_WEB_CLIENT_ID,
} from 'constants/env/envConstants';
import { IS_IOS } from 'constants/styles/appStyles';
import { Platform } from 'react-native';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: Platform.select({
      android: GOOGLE_OAUTH_WEB_CLIENT_ID,
      ios: GOOGLE_OAUTH_IOS_CLIENT_ID,
    }),
    ...(IS_IOS && { iosClientId: GOOGLE_OAUTH_IOS_CLIENT_ID }),
  });
};
