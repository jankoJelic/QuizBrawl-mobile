import {
  BASE_URL_DEV,
  SALT_DEV,
  WS_URL_DEV,
  BASE_IMAGES_URL,
  OAUTH_IOS_CLIENT_ID,
  OAUTH_WEB_CLIENT_ID,
  FIREBASE_STORAGE_BUCKET,
  ENV,
} from '@env';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const IS_DEV = ENV === 'dev';

export const BASE_URL = IS_DEV
  ? Platform.select({
      android: 'http://10.0.2.2:3000',
      ios: 'http://localhost:3000',
    })
  : 'https://quiz-clash.herokuapp.com';

export const SALT = SALT_DEV;
export const WS_URL = WS_URL_DEV;
export const BASE_URL_IMAGES = BASE_IMAGES_URL;
export const GOOGLE_OAUTH_WEB_CLIENT_ID = OAUTH_WEB_CLIENT_ID;
export const GOOGLE_OAUTH_IOS_CLIENT_ID = OAUTH_IOS_CLIENT_ID;
export const STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;

export const DEVICE_ID = DeviceInfo.getDeviceId();
