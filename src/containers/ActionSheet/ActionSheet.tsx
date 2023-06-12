import { Colors } from 'constants/styles/Colors';
import {
  AN,
  BORDER_RADIUS,
  IS_ANDROID,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const ActionSheet = ({ visible, close, children, style = {} }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={close}
      useNativeDriver
      useNativeDriverForBackdrop
      style={[styles.modal, style]}
      animationIn="bounceInUp">
      <View style={styles.modalContent} />
      {children}
    </ReactNativeModal>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    modal: {
      position: 'absolute',
      bottom: IS_ANDROID ? AN(-15) : 0,
      backgroundColor: colors.tileBackground,
      width: SCREEN_WIDTH,
      alignSelf: 'center',
      borderTopLeftRadius: BORDER_RADIUS,
      borderTopRightRadius: BORDER_RADIUS,
      alignItems: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingBottom: AN(24),
    },
    modalContent: {
      width: AN(60),
      height: AN(4),
      borderRadius: BORDER_RADIUS,
      alignSelf: 'center',
      marginTop: AN(11),
      backgroundColor: colors.neutral400,
      marginBottom: AN(22),
    },
  });

export default ActionSheet;

interface Props {
  visible: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
  style?: {};
}
