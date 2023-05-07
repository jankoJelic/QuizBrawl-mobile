import FeatherIcon from 'assets/icons/FeatherIcon';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  BORDER_RADIUS,
  PADDING_HORIZONTAL,
} from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const AnswerTile = ({ onPress, title, status = 'regular' }: Props) => {
  const { styles, colors } = useStyles(createStyles);

  const borderColor = () => {
    switch (status) {
      case 'regular':
        return colors.neutral400;
      case 'correct':
        return colors.brand500;
      case 'wrong':
        return colors.danger500;
    }
  };

  return (
    <TouchableBounce
      style={{ ...styles.container, borderColor: borderColor() }}
      onPress={onPress}>
      <BodyMedium text={title} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            ...styles.icon,
            borderColor: borderColor(),
            ...(status === 'correct' && { backgroundColor: colors.brand500 }),
            ...(status === 'wrong' && { backgroundColor: colors.danger500 }),
          }}>
          {status !== 'regular' && (
            <FeatherIcon
              size={AN(11)}
              name={status === 'correct' ? 'check' : 'x'}
              color="neutral100"
            />
          )}
        </View>
      </View>
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: AN(1),
      padding: AN(8),
      borderRadius: BORDER_RADIUS,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: AN(10),
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    icon: {
      width: AN(14),
      borderRadius: AN(14),
      aspectRatio: 1,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AnswerTile;

interface Props {
  onPress: () => void;
  title: string;
  status: 'regular' | 'correct' | 'wrong';
}
