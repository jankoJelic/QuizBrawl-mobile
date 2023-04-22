import FeatherIcon, { FeatherIconName } from 'assets/icons/FeatherIcon';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const size = SCREEN_WIDTH / 4;

const PinCodeButton = ({
  onPress,
  style = {},
  character = '1',
  icon,
}: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const [pressed, setPressed] = useState(false);

  const onPressIn = () => {
    setPressed(true);
  };

  const onPressOut = () => {
    setPressed(false);
  };

  const onPressMe = () => {
    onPress(character);
  };

  const characterColor = pressed ? 'mainTextColor' : 'brand500';

  return (
    <Pressable
      onPress={onPressMe}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.container,
        style,
        {
          backgroundColor: pressed ? colors.brand500 : colors.tileBackground,
          opacity: character ? 1 : 0,
        },
      ]}>
      {icon ? (
        <FeatherIcon
          size={24}
          name={icon}
          color={characterColor}
          onPress={onPressMe}
        />
      ) : (
        <Title text={character} color={characterColor} />
      )}
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      aspectRatio: 1,
      margin: SCREEN_WIDTH * 0.02,
      borderRadius: size,
    },
  });

export default PinCodeButton;

interface Props {
  onPress: (c: string) => void;
  character: string;
  icon?: FeatherIconName;
  style?: {};
}
