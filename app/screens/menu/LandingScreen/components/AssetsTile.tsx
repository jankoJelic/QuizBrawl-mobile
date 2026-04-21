import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  PADDING_HORIZONTAL,
  BORDER_RADIUS,
} from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import useStyles from 'hooks/styles/useStyles';

const Tile = ({ title = 'title', value = '0', Icon = <></> }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {Icon}
    <View style={{ alignItems: 'center', marginLeft: AN(6) }}>
      <BodySmall text={title} />
      <BodyMedium text={value} color="brand500" weight="bold" />
    </View>
  </View>
);

const AssetsTile = () => {
  const { trophies, money } = useAppSelector(state => state.data.userData);
  const { styles, colors } = useStyles(createStyles);

  return (
    <TileWrapper style={styles.container}>
      <Tile
        title="Trophies"
        value={String(trophies)}
        Icon={
          <FastImage
            source={require('../../../../assets/icons/trophy.png')}
            style={styles.icon}
          />
        }
      />
      <View style={styles.separator} />
      <Tile
        title="Money"
        value={String(money)}
        Icon={
          <FastImage
            source={require('../../../../assets/icons/lobbies/money.png')}
            style={styles.icon}
          />
        }
      />
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    separator: {
      width: 1,
      height: '100%',
      backgroundColor: colors.neutral400,
      borderRadius: BORDER_RADIUS,
    },
    container: {
      marginVertical: AN(20),
      flexDirection: 'row',
      paddingVertical: 14,
      marginHorizontal: PADDING_HORIZONTAL,
      justifyContent: 'space-around',
    },
    icon: { width: AN(30), aspectRatio: 1, marginRight: AN(10) },
  });

export default AssetsTile;
