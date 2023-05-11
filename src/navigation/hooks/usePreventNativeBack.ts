import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const usePreventNativeBackButton = (backAction = () => true) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
};

export default usePreventNativeBackButton;
