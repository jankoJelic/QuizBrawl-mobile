import FeatherIcon from 'assets/icons/MyIcon';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Color, Colors } from 'constants/styles/Colors';
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

const AnswerTile = ({
  onPress,
  title,
  status = 'regular',
  disabled = false,
  userName = '',
}: Props) => {
  const { styles, colors } = useStyles(createStyles);

  const borderColor = () => {
    switch (status) {
      case 'regular':
        return 'neutral400';
      case 'correct':
        return 'brand500';
      case 'wrong':
        return 'danger500';
      default:
        return 'neutral400';
    }
  };

  return (
    <TouchableBounce
      disabled={disabled}
      style={{ ...styles.container, borderColor: colors[borderColor()] }}
      onPress={onPress}>
      <BodyMedium text={title} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BodySmall
          text={status === 'regular' ? '' : userName}
          color={borderColor() as Color}
          style={{ marginRight: AN(10) }}
        />
        <View
          style={{
            ...styles.icon,
            borderColor: colors[borderColor()],
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
  disabled: boolean;
  userName?: string;
}
