import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  BORDER_RADIUS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { hideToast } from 'store/slices/appStateSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);
  const { toast } = useAppSelector(state => state.appState);
  const { visible, text, type } = toast;

  const hide = () => {
    dispatch(hideToast());
  };

  const setAutoHide = () => {
    setTimeout(() => {
      hide();
    }, 2000);
  };

  const statusColor = () => {
    switch (type) {
      case 'success':
        return colors.success500;
      case 'error':
        return colors.danger500;
      case 'warning':
        return colors.warning500;
      default:
        return colors.brand500;
    }
  };

  return (
    <Modal
      animationIn="bounceInDown"
      isVisible={visible}
      hasBackdrop={false}
      onModalShow={setAutoHide}
      style={styles.container}>
      <View
        style={{
          ...styles.statusBar,
          backgroundColor: statusColor(),
        }}
      />
      <BodyLarge text={text} style={{ marginLeft: AN(15) }} />
    </Modal>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.tileBackground,
      width: SCREEN_WIDTH * 0.9,
      alignSelf: 'center',
      maxHeight: SCREEN_HEIGHT * 0.1,
      top: AN(40),
      borderRadius: BORDER_RADIUS,
      overflow: 'hidden',
    },
    statusBar: {
      position: 'absolute',
      left: 0,
      height: '100%',
      width: AN(3),
    },
  });

export default Toast;
