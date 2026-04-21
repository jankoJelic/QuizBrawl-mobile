import MyIcon, { IconName } from 'assets/icons/MyIcon';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Banner = ({ title, icon, text, onPress = () => {} }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <TileWrapper style={styles.container} onPress={onPress}>
      <MyIcon style={styles.icon} name={icon} />
      <View>
        <BodyLarge text={title} color="brand500" />
        <BodyMedium text={text} style={styles.info} color="neutral300" />
      </View>
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginTop: AN(30),
      marginHorizontal: PADDING_HORIZONTAL,
      paddingVertical: AN(14),
      flexDirection: 'row',
    },
    icon: { width: AN(56), aspectRatio: 1, marginRight: AN(6) },
    info: { width: SCREEN_WIDTH * 0.7 },
  });

export default Banner;

interface Props {
  title: string;
  text: string;
  onPress: () => any;
  icon: IconName;
}
