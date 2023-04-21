import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useOnPressAnimation = () => {
  const scaleValue = useRef(new Animated.Value(1));

  const scaleAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue.current, {
        toValue: 0.96,
        duration: 100,
        // easing: Easing.elastic(0),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue.current, {
        toValue: 1,
        duration: 100,
        // easing: Easing.elastic(0),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    scaleValue: scaleValue.current,
    scaleAnimation,
  };
};

export default useOnPressAnimation;
