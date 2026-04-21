import MyIcon from 'assets/icons/MyIcon';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const RateQuestionBar = ({ onRate }: Props) => {
  const { styles } = useStyles(createStyles);

  const onLike = () => {
    onRate(true);
  };

  const onDislike = () => {
    onRate(false);
  };

  return (
    <>
      <BodyMedium text="Rate this question" style={styles.title} />
      <View style={styles.iconsContainer}>
        <MyIcon
          family="antDesign"
          name="dislike2"
          color="danger500"
          onPress={onDislike}
        />
        <MyIcon
          family="antDesign"
          name="like2"
          color="success500"
          onPress={onLike}
        />
      </View>
    </>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: AN(30),
    },
    title: { textAlign: 'center', marginTop: AN(20) },
  });

export default RateQuestionBar;

interface Props {
  onRate: (like: boolean) => any;
}
