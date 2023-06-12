import { Colors } from 'constants/styles/Colors';
import {
  IS_IOS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from 'store';
import { setColorOpacity } from 'util/strings/setColorOpacity';

const FullScreenSpinner = () => {
  const { styles, colors } = useStyles(createStyles);
  const { isLoading } = useAppSelector(state => state.appState);

  return (
    <View style={[styles.container, { zIndex: isLoading ? 999 : -1 }]}>
      {IS_IOS ? (
        <FastImage
          source={require('../../../assets/spinners/fullScreenSpinner.png')}
          style={{ width: SCREEN_WIDTH / 2.2, aspectRatio: 1 }}
        />
      ) : (
        <ActivityIndicator color={colors.brand500} size="large" />
      )}
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
    },
  });

export default FullScreenSpinner;
