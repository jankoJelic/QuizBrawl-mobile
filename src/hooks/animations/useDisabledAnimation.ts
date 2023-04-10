import { Animated } from 'react-native';

const useDisabledAnimation = () => {
  const shakeValue = new Animated.Value(0);

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeValue, {
        toValue: 10,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: -10,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 10,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 0,
        duration: 70,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    shakeValue: shakeValue,
    shakeAnimation,
  };
};

export default useDisabledAnimation;
