import MyIcon from 'assets/icons/MyIcon';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { League } from 'services/api/endpoints/leaguesAPI';

const LeagueTile = ({ league, onPress }: Props) => {
  const { styles } = useStyles(createStyles);
  const { image, name, bet, password, users, createdAt, type } = league || {};
  const iconSize = AN(10);

  const onPressMe = () => {
    onPress(league);
  };

  return (
    <TileWrapper style={styles.container} onPress={onPressMe}>
      <View style={styles.leftSide}>
        <FastImage style={styles.image} source={{ uri: image }} />
        <View>
          <BodyLarge text={name} />
          <BodyMedium
            text={`${String(users?.length)} player(s)`}
            color="neutral300"
          />
        </View>
      </View>
      <View style={styles.rightSide}>
        <BodySmall
          text={`since ${new Date(createdAt).toLocaleDateString()}`}
          style={styles.date}
          color="neutral300"
        />

        <View style={styles.rightSubtitle}>
          <BodySmall
            text={`type: ${type}`}
            color="neutral300"
            style={styles.icon}
          />
          {!bet ? (
            <MyIcon name="money" size={iconSize} style={styles.icon} />
          ) : (
            <></>
          )}
          <MyIcon
            name={password ? 'lock' : 'unlock'}
            color={password ? 'danger500' : 'success500'}
            size={iconSize}
          />
        </View>
      </View>
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: AN(14),
      padding: AN(12),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSide: { flexDirection: 'row' },
    rightSide: { alignItems: 'flex-end' },
    date: { textAlign: 'right', marginBottom: AN(4) },
    rightSubtitle: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: AN(4) },
    image: { height: AN(40), aspectRatio: 1, marginRight: AN(16) },
  });

export default LeagueTile;

interface Props {
  league: League;
  onPress: (league: League) => any;
}
