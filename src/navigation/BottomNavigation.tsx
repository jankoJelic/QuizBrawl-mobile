import { useNavigation } from '@react-navigation/native';
import MyIcon, { IconFamily, IconName } from 'assets/icons/MyIcon';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NavIcon = ({
  title = '',
  icon = 'check',
  onPress,
  iconFamily = 'feather',
}: NavIconProps) => {
  const onPressMe = () => {
    onPress(title);
  };

  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPressMe}>
      <MyIcon name={icon} color="neutral400" family={iconFamily} />
      <BodySmall
        text={title}
        color="neutral400"
        style={{ textAlign: 'center' }}
      />
    </TouchableOpacity>
  );
};

const BottomNavigation = () => {
  const { colors, styles } = useStyles(createStyles);
  const navigation = useNavigation();

  const goTopMarket = () => {
    navigation.navigate('Market');
  };

  const goToFriendsScreen = () => {
    navigation.navigate('Friends');
  };

  const startQuickGame = () => {};

  const goToExploreScreen = () => {};

  return (
    <View style={styles.container}>
      <NavIcon title="Market" icon="shopping-cart" onPress={goTopMarket} />
      <NavIcon title="Friends" icon="users" onPress={goToFriendsScreen} />

      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <NavIcon title="Ranks" icon="ranking" />
      <NavIcon
        title="Explore"
        icon="explore"
        iconFamily="material"
        onPress={goToFriendsScreen}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'absolute',
      height: AN(54),
      justifyContent: 'space-around',
      bottom: 0,
      backgroundColor: colors.tileBackground,
      width: '100%',
      alignItems: 'center',
    },
  });

export default BottomNavigation;

interface NavIconProps {
  title: string;
  icon: IconName;
  onPress: (title: string) => any;
  iconFamily?: IconFamily;
}
