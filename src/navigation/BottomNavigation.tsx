import { useNavigation } from '@react-navigation/native';
import MyIcon, { IconName } from 'assets/icons/MyIcon';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NavIcon = ({ title = '', icon = 'check', onPress }: NavIconProps) => {
  const onPressMe = () => {
    onPress(title);
  };

  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPressMe}>
      <MyIcon name={icon} color="neutral400" />
      <BodySmall text={title} color="neutral400" />
    </TouchableOpacity>
  );
};

const BottomNavigation = () => {
  const { colors, styles } = useStyles(createStyles);
  const navigation = useNavigation();

  const goToShop = () => {
    navigation.navigate('Shop');
  };

  const goToFriendsScreen = () => {
    navigation.navigate('Friends');
  };

  const startQuickGame = () => {};

  const goToExploreScreen = () => {}

  return (
    <View style={styles.container}>
      <NavIcon title="Shop" icon="shopping-cart" onPress={goToShop} />
      <NavIcon title="Friends" icon="users" onPress={goToFriendsScreen} />

      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <NavIcon title="Explore" icon="users" onPress={goToFriendsScreen} />

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
}
