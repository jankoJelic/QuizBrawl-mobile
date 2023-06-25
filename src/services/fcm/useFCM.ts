import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { navigate } from 'navigation/MainStackNavigator';
import { useEffect } from 'react';
import API from 'services/api';
import { store } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { MessageType } from 'store/types/dataSliceTypes';

export interface Notification {
  notification: { title: string; text: string };
  data: {
    type: MessageType;
    payload: string;
  };
}

export const handleOnPressNotification = async (message: Notification) => {
  store.dispatch(startLoading());

  try {
    const {
      data: { type, payload },
    } = message || {};
    switch (type) {
      case 'LEAGUE_GAME_INVITE':
        const leagueId = Number(payload);
        const league = await API.getLeague(Number(leagueId));
        navigate('League', { league });
        break;
      default:
        return;
    }
  } catch (error) {
  } finally {
    store.dispatch(stopLoading());
  }
};

const useFCM = () => {
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        API.connectToFCM(token).catch(e => {});
      });

    return messaging().onTokenRefresh(token => {
      API.connectToFCM(token);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('on IN APP ===> message!!!');
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((message: FirebaseMessagingTypes.RemoteMessage) => {
        handleOnPressNotification(message);
      });
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
