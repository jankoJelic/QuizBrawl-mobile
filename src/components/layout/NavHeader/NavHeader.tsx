import FeatherIcon from 'assets/icons/MyIcon';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL, AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const NavHeader = ({
  title = '',
  fullWidth = false,
  showLeftIcon = true,
  showRightIcon = true,
  style = {},
  onPressLeftIcon,
  onPressRightIcon,
}: Props) => {
  const { styles } = useStyles(createStyles);
  const navigation = useMyNavigation();

  const iconSize = AN(26);

  const onPressLeftArrow = () => {
    onPressLeftIcon ? onPressLeftIcon() : navigation.goBack();
  };

  const onPressRightArrow = () => {
    onPressRightIcon ? onPressRightIcon() : navigation.navigate('Landing');
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
        style={{ opacity: showRightIcon ? 1 : 0 }}
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
      marginVertical: AN(20),
    },
  });

export default NavHeader;

interface Props {
  title: string;
  fullWidth?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  style?: {};
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}
