import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'assets/icons/FeatherIcon';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL, AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const NavHeader = ({
  title = '',
  fullWidth = false,
  showLeftIcon = true,
  showRightIcon = true,
  style = {},
}) => {
  const { styles } = useStyles(createStyles);
  const navigation = useNavigation();

  const iconSize = AN(26);

  const onPressLeftArrow = () => {
    navigation.goBack();
  };

  const onPressRightArrow = () => {
    navigation.navigate('Landing');
  };

  return (
    <View
      style={{
        ...styles.container,
        ...(fullWidth && { paddingHorizontal: 0 }),
        ...style,
      }}>
      <FeatherIcon
        name="arrow-left"
        size={iconSize}
        onPress={showLeftIcon ? onPressLeftArrow : undefined}
        color="mainTextColor"
        style={{ opacity: showLeftIcon ? 1 : 0 }}
      />
      <Title text={title} color="mainTextColor" />
      <FeatherIcon
        name="x"
        size={iconSize}
        onPress={onPressRightArrow}
        color="mainTextColor"
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
  });

export default NavHeader;
