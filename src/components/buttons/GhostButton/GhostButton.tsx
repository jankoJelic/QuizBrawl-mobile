import MyIcon, { IconName } from 'assets/icons/MyIcon';
import BodyMedium from 'components/typography/BodyMedium';
import { Color, Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS, CTA_HEIGHT } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const GhostButton = ({
  title,
  onPress = () => {},
  color = 'brand500',
  iconName = '',
  iconColor = 'neutral300',
  style = {},
}: Props) => {
  const { colors, styles } = useStyles(createStyles);

  const renderIcon = () => {
    if (!iconName) return null;
    const iconStyle = { marginRight: AN(8) };

    return <MyIcon style={iconStyle} name={iconName} color={iconColor} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{ ...styles.container, borderColor: colors[color], ...style }}>
      {renderIcon()}
      <BodyMedium text={title} color={color} weight="bold" />
    </TouchableOpacity>
  );
};

export default GhostButton;

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: CTA_HEIGHT,
      borderRadius: BORDER_RADIUS,
      padding: AN(10),
      alignItems: 'center',
      borderWidth: AN(1),
      marginVertical: AN(14),
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });

interface Props {
  title: string;
  onPress: () => void;
  color?: Color;
  iconName?: IconName | '';
  iconColor?: Color;
  style?: {};
}
