import EncryptedStorage from 'react-native-encrypted-storage';

const storeValue = async (key: EncryptedStorageKey, value: any) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

const getValue = async (key: EncryptedStorageKey) => {
  try {
    const value = await EncryptedStorage.getItem(key);

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
    await EncryptedStorage.removeItem(key);
  } catch (error) {}
};

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
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
  | 'credentials';

export default ENCRYPTED_STORAGE;
