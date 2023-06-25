import messaging from '@react-native-firebase/messaging';
import { navigate } from 'navigation/MainStackNavigator';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { store } from 'store/index';
import {
  showToast,
  startLoading,
  stopLoading,
} from 'store/slices/appStateSlice';
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
  const dispatch = useDispatch();

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
      dispatch(
        showToast({
          text: remoteMessage.notification?.title || '',
          type: 'success',
          remoteMessage,
        }),
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().getInitialNotification().then(handleOnPressNotification);
    messaging().onNotificationOpenedApp(handleOnPressNotification);
  }, []);

  // useEffect(() => {
  //   messaging()
  //     .()
  //     .then((message: FirebaseMessagingTypes.RemoteMessage) => {
  //       handleOnPressNotification(message);
  //     });
  // }, []);
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
