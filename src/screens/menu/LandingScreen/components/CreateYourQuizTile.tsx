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
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const CreateYourQuizTile = () => {
  const navigation = useMyNavigation();
  const { styles } = useStyles(createStyles);

  const goToCreateQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  return (
    <TileWrapper style={styles.container} onPress={goToCreateQuiz}>
      <FastImage
        style={styles.icon}
        source={require('../../../../assets/icons/mushroom.png')}
      />
      <View>
        <BodyLarge text="Create your quiz!" color="brand500" />
        <BodyMedium
          text="Make cool trivia checks by yourself or with friends"
          style={styles.info}
          color="neutral300"
        />
      </View>
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginTop: AN(35),
      marginHorizontal: PADDING_HORIZONTAL,
      paddingVertical: AN(14),
      flexDirection: 'row',
    },
    icon: { width: AN(56), aspectRatio: 1 },
    info: { width: SCREEN_WIDTH * 0.7 },
  });

export default CreateYourQuizTile;
