declare module '@env' {
  export const ENV: 'dev'| 'prod';
  export const BASE_URL_DEV: string;
  export const WS_URL_DEV: string;
  export const SALT_DEV: string;
  export const BASE_IMAGES_URL: string;
  export const OAUTH_WEB_CLIENT_ID: string;
  export const OAUTH_IOS_CLIENT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
}
