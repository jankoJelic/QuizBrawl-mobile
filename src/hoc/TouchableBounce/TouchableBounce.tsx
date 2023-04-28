import { HIT_SLOP } from 'constants/styles/appStyles';
import useDisabledAnimation from 'hooks/animations/useDisabledAnimation';
import useOnPressAnimation from 'hooks/animations/useOnPressAnimation';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableBounce = ({
  onPress = () => {},
  style = {},
  disabled = false,
  children = <></>,
  onPressOut = () => {},
  onPressIn = () => {},
  hitSlop = HIT_SLOP(10),
  animationDisabled,
}: Props) => {
  const { scaleAnimation, scaleValue } = useOnPressAnimation();
  const { shakeAnimation, shakeValue } = useDisabledAnimation();

  const onPressMeIn = () => {
    if (disabled) {
      shakeAnimation();
      return;
    }

    if (!animationDisabled) scaleAnimation();
    onPressIn();
  };

  const onPressMe = () => {
    if (disabled) return;
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={onPressMe}
      style={[
        { transform: [{ scale: scaleValue }, { translateX: shakeValue }] },
        style,
      ]}
      onPressIn={onPressMeIn}
      onPressOut={onPressOut}
      activeOpacity={disabled ? 0.5 : 1}
      hitSlop={hitSlop}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableBounce;

interface Props {
  onPress: (a?: any) => void;
  onPressOut?: () => void;
  onPressIn?: () => void;
  style?: {};
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
  hitSlop?: {};
  animationDisabled?: boolean;
}
