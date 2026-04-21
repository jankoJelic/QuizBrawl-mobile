import PinCodeKeyboard from 'components/inputs/PinCodeKeyboard';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import {
  SCREEN_WIDTH,
  AN,
  PADDING_HORIZONTAL,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { League } from 'services/api/endpoints/leaguesAPI';
import { Quiz } from 'store/slices/createQuizSlice';

const LeagueInfoHeader = ({ selectedQuiz, league }: Props) => {
  const { styles } = useStyles(createStyles);
  const { image, type, bet, users, userId, nextQuizUserId } = league || {};
  const admin = users?.find(u => u.id === userId);

  const nextPlayerToSubmitQuiz = type === 'ADMIN' ? userId : nextQuizUserId;
  const nextPlayerName = users?.find(
    u => u.id === nextPlayerToSubmitQuiz,
  )?.firstName;

  return (
    <View style={styles.leagueInfoHeader}>
      <View style={{ flexDirection: 'row' }}>
        <FastImage source={{ uri: image }} style={styles.image} />
        <View>
          <BodyLarge
            text={`Admin: ${admin?.firstName}`}
            style={styles.alignTextRight}
          />
          <BodyLarge text={`Type: ${type}`} />
          {/* <BodyLarge text={`Bet: ${bet}`} style={styles.alignTextRight} />
          <BodyLarge text={`Reward: ${bet}`} style={styles.alignTextRight} /> */}
        </View>
      </View>
      <View>
        <BodyMedium text="Next up:" style={styles.alignTextRight} />
        <BodyMedium
          text={nextPlayerName || 'n/a'}
          color="brand500"
          style={styles.alignTextRight}
        />
        <BodyMedium text="Quiz name:" style={styles.alignTextRight} />
        <BodyMedium
          text={selectedQuiz?.name || 'n/a'}
          color="brand500"
          style={styles.alignTextRight}
        />
      </View>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    image: {
      width: SCREEN_WIDTH * 0.25,
      aspectRatio: 1,
      marginRight: AN(20),
    },
    leagueInfoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
      justifyContent: 'space-between',
    },
    alignTextRight: { textAlign: 'right' },
  });

export default LeagueInfoHeader;

interface Props {
  selectedQuiz: undefined | Quiz;
  league: League;
}
