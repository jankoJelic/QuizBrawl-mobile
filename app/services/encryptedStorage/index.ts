import * as SecureStore from 'expo-secure-store';

const storeValue = async (key: EncryptedStorageKey, value: any) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {}
};

const getValue = async (key: EncryptedStorageKey) => {
  try {
    const value = await SecureStore.getItemAsync(key);

    if (!!value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const removeValue = async (key: EncryptedStorageKey) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {}
};

const ALL_KEYS: EncryptedStorageKey[] = [
  'userData', 'pin', 'accessToken', 'refreshToken', 'musicEnabled', 'credentials',
];

const clearStorage = async () => {
  try {
    await Promise.all(ALL_KEYS.map(key => SecureStore.deleteItemAsync(key)));
  } catch (error) {}
};

const ENCRYPTED_STORAGE = {
  getValue,
  storeValue,
  removeValue,
  clearStorage,
};

type EncryptedStorageKey =
  | 'userData'
  | 'pin'
  | 'accessToken'
  | 'refreshToken'
  | 'musicEnabled'
  | 'credentials';

export default ENCRYPTED_STORAGE;
