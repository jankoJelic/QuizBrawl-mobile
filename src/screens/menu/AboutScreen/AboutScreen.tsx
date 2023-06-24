import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

const AboutScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'About'>
> = ({ navigation }) => {
  const { styles, commonStyles, colors } = useStyles(createStyles);

  const prepareSupportEmail = () => {
    Linking.openURL('mailto:quizclashgame@gmail.com?subject=Hello');
  };

  const onPressBuyCoffee = async () => {};

  return (
    <ScreenWrapper>
      <NavHeader fullWidth title="About me" />
      <Text style={styles.description}>
        <BodyLarge
          text={`Hello, I am a very passionate developer and quiz maker. Hope you are enjoying this game with yours friends as much as I've enjoyed making it.

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
        <BodyLarge text=" https://www.flaticon.com " color="brand500" />
        <BodyLarge text="for providing this app with a lot of amazing avatars players can use and win!" />
      </Text>
      <View style={styles.separator} />

      {/* <View style={commonStyles.ctaFooter}>
        <BodyMedium
          style={styles.footerText}
          text="You can also support my effort by buying me coffee and for that I buy you in-game coffee :)"
        />
        <CTA title="Buy me a coffee" onPress={onPressBuyCoffee} />
      </View> */}
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
      marginVertical: AN(8),
    },
  });

export default AboutScreen;
