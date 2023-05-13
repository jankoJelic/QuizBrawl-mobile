import { Colors } from 'constants/styles/Colors';
import {
  AN,
  BORDER_RADIUS,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const ActionSheet = ({ visible, close, children }: Props) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={close}
      useNativeDriver
      useNativeDriverForBackdrop
      style={{
        position: 'absolute',
        bottom: 10,
        backgroundColor: colors.tileBackground,
        width: SCREEN_WIDTH,
        alignSelf: 'center',
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        alignItems: 'center',
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingBottom: AN(24),
      }}
      animationIn="bounceInUp">
      <View
        style={{
          width: AN(60),
          height: AN(4),
          borderRadius: BORDER_RADIUS,
          alignSelf: 'center',
          marginTop: AN(11),
          backgroundColor: colors.neutral400,
          marginBottom: AN(22),
        }}
      />
      {children}
    </ReactNativeModal>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default ActionSheet;

interface Props {
  visible: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
}