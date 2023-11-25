import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopicIcon } from 'assets/icons/topics';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, FONTS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

const GameSplashScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'GameSplash'>
> = ({ navigation, route }) => {
  const { users, topic, questionsCount } = route.params.room || {};
  const { styles, colors } = useStyles(createStyles);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let countdownInterval = setInterval(() => {
      setCountdown(c => {
        if (c === 0) {
          clearInterval(countdownInterval);
          navigation.navigate('Question');
          return 3;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const isSoloGame = users.length < 2;

  const renderSoloGameContent = () => (
    <>
      <Title text="Solo game" style={{ marginTop: AN(10) }} />
      <View style={{ flexDirection: 'row', marginVertical: AN(20) }}>
        <TopicIcon topic={topic} style={{ width: 20, aspectRatio: 1 }} />
        <BodyLarge
          text={topic.toLowerCase()}
          style={{ marginLeft: AN(6), textTransform: 'capitalize' }}
        />
      </View>
      <BodyLarge text={`Number of questions: ${questionsCount}`} />
    </>
  );

  const renderMultiPlayerContent = () => (
    <FlatList
      data={users}
      keyExtractor={item => `gamesplash-${item.id}`}
      numColumns={2}
      contentContainerStyle={{ width: '100%' }}
      renderItem={({ item }) => {
        return (
          <View style={{ width: '50%' }}>
            <FastImage
              source={{ uri: item.avatar }}
              style={{ width: AN(25), aspectRatio: 1 }}
            />
          </View>
        );
      }}
    />
  );

  return (
    <ScreenWrapper style={styles.screen}>
      <Animated.Text style={styles.number}>{String(countdown)}</Animated.Text>
      {isSoloGame ? renderSoloGameContent() : renderMultiPlayerContent()}
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    number: {
      fontFamily: FONTS.bold,
      color: colors.brand500,
      textAlign: 'center',
      fontSize: AN(55),
    },
    screen: { alignItems: 'center', justifyContent: 'center' },
  });

export default GameSplashScreen;
