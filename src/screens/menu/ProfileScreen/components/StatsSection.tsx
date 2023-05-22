import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TOPICS } from 'screens/CreateRoomScreen/CreateRoomScreen';
import { Topic } from 'store/types/dataSliceTypes';

const initialAnswers = {
  General: 0,
  Sports: 0,
  Music: 0,
  History: 0,
  Geography: 0,
  Showbiz: 0,
  Art: 0,
  Science: 0,
};

const StatsSection = ({ correctAnswers, totalAnswers }: Props) => {
  const { colors, styles } = useStyles(createStyles);

  const realCorrectAnswers = correctAnswers || initialAnswers;
  const realTotalAnswers = totalAnswers || initialAnswers;

  const correctAnswersCount = Object.values(realCorrectAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAnswersCount = Object.values(realTotalAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAccuracy =
    totalAnswersCount === 0
      ? '0.00'
      : ((correctAnswersCount / totalAnswersCount) * 100).toFixed(2);

  const renderStats = ({
    item,
  }: {
    item: { name: Topic; icon: JSX.Element };
  }) => {
    const topicPercentage =
      (
        (realCorrectAnswers[item.name] * 100 || 0) /
        (realTotalAnswers[item.name] || 1)
      ).toFixed(2) + '%';

    return (
      <TileWrapper style={styles.statsTile}>
        <>{item.icon}</>
        <>
          <BodyMedium
            text={item.name}
            style={{ marginTop: AN(6) }}
            color="neutral300"
          />
          <BodyMedium text={topicPercentage} />
        </>
      </TileWrapper>
    );
  };

  return (
    <>
      <BodyMedium
        weight="bold"
        text={`${totalAccuracy}% accuracy`}
        style={styles.subtitle}
      />
      <FlatList
        horizontal
        data={TOPICS}
        renderItem={renderStats}
        keyExtractor={item => item.name + '_accuracyByTopic'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          left: PADDING_HORIZONTAL,
          paddingRight: PADDING_HORIZONTAL,
          height: AN(110),
        }}
        // style={{ height: AN(100) }}
      />
    </>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    statsTile: {
      alignItems: 'center',
      height: AN(96),
      marginRight: AN(10),
      minWidth: AN(90),
    },
    subtitle: {
      marginLeft: PADDING_HORIZONTAL,
      marginTop: AN(24),
      marginBottom: AN(7),
    },
  });

export default StatsSection;

interface Props {
  correctAnswers: Record<Topic, number>;
  totalAnswers: Record<Topic, number>;
}
