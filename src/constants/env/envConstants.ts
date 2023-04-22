import { BASE_URL_DEV, SALT_DEV } from '@env';
import DeviceInfo from 'react-native-device-info';

export const BASE_URL = BASE_URL_DEV;
export const SALT = SALT_DEV;

export const DEVICE_ID = DeviceInfo.getDeviceId();
