import storage from '@react-native-firebase/storage';

export const getFirebaseImageUrl = async (
  imageName: string,
  prefix = 'customQuizzes',
) => {
  return await storage().ref(`${prefix}/${imageName}`).getDownloadURL();
};

export const uploadFirebaseImage = async ({
  folder = '',
  fileName = '',
  filePath = '',
}) => {
  try {
    const storageRef = storage().ref(`${folder}/${fileName}`);
    storageRef.putFile(filePath);
  } catch (error) {
    JSON.stringify(error);
  }
};
