import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Color, Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

const ProfileBadge = ({ amount, imageSource, color, isLoading }: Props) => {
  const { colors, styles } = useStyles(createStyles);
  return (
    <View style={{ ...styles.container, borderColor: colors[color] }}>
      <FastImage
        source={imageSource}
        style={{ width: AN(30), aspectRatio: 1 }}
      />
      <BodySmall text={isLoading ? '...' : String(amount)} color={color} />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.neutral500,
      padding: AN(10),
      borderRadius: AN(50),
      borderWidth: 1,
      marginVertical: AN(10),
      alignItems: 'center',
      minWidth: AN(70),
    },
  });

export default ProfileBadge;

interface Props {
  imageSource: Source;
  amount: string;
  color: Color;
  isLoading?: boolean;
}
