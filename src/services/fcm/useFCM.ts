import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import API from 'services/api';

const useFCM = () => {
  useEffect(() => {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        messaging()
          .getToken()
          .then(token => {
            API.connectToFCM(token).catch(e => {});
          });
      });

    return messaging().onTokenRefresh(token => {
      API.connectToFCM(token);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
};

export default useFCM;

{
  /* 
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);*/
}
