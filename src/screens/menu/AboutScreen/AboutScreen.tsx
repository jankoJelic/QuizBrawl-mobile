import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

const AboutScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'About'>
> = ({ navigation }) => {
  const FLAT_ICON_URL = 'https://www.flaticon.com';
  const TRIVIA_API_URL = 'https://the-trivia-api.com';
  const OPEN_TDB_URL = 'https://opentdb.com/';
  const { styles } = useStyles(createStyles);

  const prepareSupportEmail = () => {
    Linking.openURL('mailto:quizclashgame@gmail.com?subject=Hello');
  };

  const openFlatIcon = async () => {
    Linking.openURL(FLAT_ICON_URL);
  };

  const openTriviaApi = async () => {
    Linking.openURL(TRIVIA_API_URL);
  };

  const openOpenTDB = async () => {
    Linking.openURL(OPEN_TDB_URL);
  };

  return (
    <ScreenWrapper>
      <NavHeader fullWidth title="Credits" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          <BodyLarge
            text={`Hello, I am a very passionate developer and quiz maker. Hope you are enjoying this game with your friends as much as I've enjoyed making it.

If you would like to contribute by creating amazing new questions, contact me at`}
          />
          <BodyLarge
            text={`  quizclashgame@gmail.com
`}
            color="brand500"
            onPress={prepareSupportEmail}
          />
        </Text>
        <View style={styles.separator} />
        <Text style={{ textAlign: 'center' }}>
          <BodyLarge text="Special thanks to" />
          <BodyLarge
            text={` ${FLAT_ICON_URL} `}
            color="brand500"
            onPress={openFlatIcon}
          />
          <BodyLarge text="for providing this app with a lot of amazing avatars players can use and win!" />
        </Text>
        <View style={styles.separator} />

        <View style={styles.separator} />
        <Text style={{ textAlign: 'center' }}>
          <BodyLarge text="Other than my own questions, I have imported some from these APIs in order to deliver a more diverse game to you guys:" />
          <BodyLarge
            text={`\n • ${TRIVIA_API_URL} `}
            color="brand500"
            onPress={openTriviaApi}
          />
          <BodyLarge
            text={`\n • ${OPEN_TDB_URL} `}
            color="brand500"
            onPress={openOpenTDB}
          />
          <BodyLarge
            text={`\n Amazing stuff fellas, cheers!`}
            onPress={openOpenTDB}
          />
        </Text>
        <View style={styles.separator} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    description: { textAlign: 'center', marginTop: AN(20) },
    footerText: { textAlign: 'center', marginBottom: AN(10) },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: colors.neutral400,
      marginVertical: AN(12),
    },
  });

export default AboutScreen;
