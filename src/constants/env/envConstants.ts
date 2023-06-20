import {
  BASE_URL_DEV,
  SALT_DEV,
  WS_URL_DEV,
  BASE_IMAGES_URL,
  OAUTH_IOS_CLIENT_ID,
  OAUTH_WEB_CLIENT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';
import DeviceInfo from 'react-native-device-info';

export const BASE_URL = 'https://quiz-clash.herokuapp.com';

// Platform.select({
//   android: 'http://10.0.2.2:3000',
//   ios: 'http://localhost:3000',
// });
export const SALT = SALT_DEV;
export const WS_URL = WS_URL_DEV;
export const BASE_URL_IMAGES = BASE_IMAGES_URL;
export const GOOGLE_OAUTH_WEB_CLIENT_ID = OAUTH_WEB_CLIENT_ID;
export const GOOGLE_OAUTH_IOS_CLIENT_ID = OAUTH_IOS_CLIENT_ID;
export const STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;

export const DEVICE_ID = DeviceInfo.getDeviceId();
