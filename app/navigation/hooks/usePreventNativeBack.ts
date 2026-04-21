import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const usePreventNativeBackButton = (backAction = () => true) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => subscription.remove();
  }, []);
};

export default usePreventNativeBackButton;
