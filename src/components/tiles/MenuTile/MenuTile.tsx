import MyIcon, { IconName } from 'assets/icons/MyIcon';
import Tag from 'components/misc/Tag';
import BodyMedium from 'components/typography/BodyMedium';
import { Color, Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native';

const MenuTile = ({
  title,
  onPress = () => {},
  tag,
  icon,
  tagColor,
}: Props) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <TouchableOpacity
      style={{ ...styles.row, marginVertical: AN(15) }}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.row}>
        <MyIcon name={icon} style={{ marginRight: AN(12) }} />
        <BodyMedium text={title} />
      </View>
      {!!tag && <Tag text={tag} color={tagColor} />}
    </TouchableOpacity>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default MenuTile;

interface Props {
  title: string;
  onPress: () => void;
  tag?: string;
  icon: IconName;
  tagColor?: Color;
}
