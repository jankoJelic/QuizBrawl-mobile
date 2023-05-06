import { BASE_URL_DEV, SALT_DEV, WS_URL_DEV, BASE_IMAGES_URL } from '@env';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
});
export const SALT = SALT_DEV;
export const WS_URL = WS_URL_DEV;
export const BASE_URL_IMAGES = BASE_IMAGES_URL;

export const DEVICE_ID = DeviceInfo.getDeviceId();
