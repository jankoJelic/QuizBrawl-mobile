import MyImage from 'components/icons/MyImage';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { hideReward } from 'store/slices/appStateSlice';
import Modal from 'react-native-modal';

const Reward = () => {
  const dispatch = useDispatch();
  const { amount, currency, visible } = useAppSelector(
    state => state.appState.reward,
  );

  const { styles } = useStyles(createStyles);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(hideReward());
      }, 3000);
    }
  }, [visible]);

  const iconName = () => {
    switch (currency) {
      case 'trophies':
        return 'trophy';
      default:
        return 'money';
    }
  };

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={false}
      animationIn="bounceInDown"
      animationOut="fadeOutUp">
      <Animated.View style={styles.trophyContainer}>
        <MyImage name={iconName()} style={styles.trophy} />
        <TileWrapper style={styles.amount}>
          <Title
            color="warning400"
            text={`${amount}${currency === 'points' ? ' points' : ''}`}
          />
        </TileWrapper>
      </Animated.View>
    </Modal>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    trophyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      margin: 'auto',
      zIndex: 10000000,
    },
    trophy: {
      width: SCREEN_WIDTH * 0.4,
      aspectRatio: 1,
    },
    amount: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: AN(30),
    },
  });

export default Reward;
