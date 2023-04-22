import { Colors } from 'constants/styles/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from 'store';
import { setColorOpacity } from 'util/strings/setColorOpacity';

const FullScreenSpinner = () => {
  const { styles } = useStyles(createStyles);
  const { isLoading } = useAppSelector(state => state.appState);

  return (
    <View style={[styles.container, { opacity: isLoading ? 1 : 0 }]}>
      <FastImage
        source={require('../../../assets/spinners/fullScreenSpinner.png')}
        style={{ width: SCREEN_WIDTH / 2.2, aspectRatio: 1 }}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: setColorOpacity(colors.mainThemeBackground),
      flex: 1,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 999,
    },
  });

export default FullScreenSpinner;
