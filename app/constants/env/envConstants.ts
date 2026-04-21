import {
  WS_URL_DEV,
  BASE_IMAGES_URL,
  OAUTH_IOS_CLIENT_ID,
  OAUTH_WEB_CLIENT_ID,
  FIREBASE_STORAGE_BUCKET,
  ENV,
} from "@env";
import { Platform } from "react-native";
import * as Application from "expo-application";

export const IS_DEV = ENV === "dev";

export const BASE_URL = Platform.select({
  android: "http://10.0.2.2:3000",
  ios: "http://localhost:3000",
});

export const WS_URL = WS_URL_DEV;
export const BASE_URL_IMAGES = BASE_IMAGES_URL;
export const GOOGLE_OAUTH_WEB_CLIENT_ID = OAUTH_WEB_CLIENT_ID;
export const GOOGLE_OAUTH_IOS_CLIENT_ID = OAUTH_IOS_CLIENT_ID;
export const STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;

export const getDeviceId = async (): Promise<string> => {
  if (Platform.OS === 'ios') {
    return (await Application.getIosIdForVendorAsync()) ?? 'unknown';
  }
  return Application.getAndroidId() ?? 'unknown';
};
