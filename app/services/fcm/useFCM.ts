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
    let unsubscribeTokenRefresh: (() => void) | undefined;
    try {
      messaging()
        .getToken()
        .then(token => {
          API.connectToFCM(token).catch(() => {});
        })
        .catch(() => {});

      unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
        API.connectToFCM(token);
      });
    } catch {}

    return () => unsubscribeTokenRefresh?.();
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = messaging().onMessage(remoteMessage => {
        dispatch(
          showToast({
            text: remoteMessage.notification?.title || '',
            type: 'success',
            remoteMessage,
          }),
        );
      });
    } catch {}

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    try {
      messaging().getInitialNotification().then(handleOnPressNotification).catch(() => {});
      messaging().onNotificationOpenedApp(handleOnPressNotification);
    } catch {}
  }, []);
};

export default useFCM;
