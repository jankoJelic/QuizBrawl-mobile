import storage from '@react-native-firebase/storage';

export const getFirebaseImageUrl = async (
  imageName: string,
  customQuiz?: boolean,
) => {
  return await storage().ref(`customQuizzes/${imageName}`).getDownloadURL();
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
