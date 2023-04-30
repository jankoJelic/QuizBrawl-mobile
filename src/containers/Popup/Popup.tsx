import ClearButton from 'components/buttons/ClearButton';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const Popup = ({
  visible,
  closeModal,
  title,
  text,
  firstButtonTitle,
  secondButtonTitle,
  onPressFirstButton = () => {},
  onPressSecondButton = () => {},
}: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <Modal isVisible={visible} onBackdropPress={closeModal}>
      <TileWrapper style={styles.container}>
        <BodyLarge text={title} weight="bold" style={styles.title} />
        <BodyMedium text={text} style={styles.text} color="neutral300" />
        <View style={styles.buttonsFooter}>
          {!!secondButtonTitle && (
            <ClearButton
              title={secondButtonTitle}
              onPress={onPressSecondButton}
              color="danger500"
            />
          )}
          <ClearButton title={firstButtonTitle} onPress={onPressFirstButton} />
        </View>
      </TileWrapper>
    </Modal>
  );
};

export default Popup;

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH * 0.82,
      padding: AN(24),
      alignItems: 'center',
      alignSelf: 'center',
    },
    title: { textAlign: 'center' },
    text: { textAlign: 'center', marginVertical: AN(10) },
    buttonsFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: AN(10),
    },
  });

interface Props {
  visible: boolean;
  closeModal?: () => void;
  title: string;
  text: string;
  firstButtonTitle: string;
  secondButtonTitle?: string;
  onPressFirstButton: () => void;
  onPressSecondButton?: () => void;
}
