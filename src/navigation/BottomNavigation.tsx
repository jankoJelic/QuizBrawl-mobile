import MyIcon, { IconFamily, IconName } from 'assets/icons/MyIcon';
import FloatingButton from 'components/buttons/FloatingButton';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMyNavigation } from './hooks/useMyNavigation';

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
      <MyIcon
        name={icon}
        color="neutral400"
        family={iconFamily}
        style={{ width: AN(32), height: AN(32) }}
      />
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
  const navigation = useMyNavigation();

  const goTopMarket = () => {
    navigation.navigate('Market');
  };

  const goToFriendsScreen = () => {
    navigation.navigate('Friends');
  };

  const startQuickGame = () => {};

  const goToRankings = () => {
    navigation.navigate('Leaderboards');
  };

  const goToLeagues = () => {
    navigation.navigate('Leagues');
  };

  return (
    <View style={styles.container}>
      <NavIcon title="Market" icon="market" onPress={goTopMarket} />
      <NavIcon title="Friends" icon="friends" onPress={goToFriendsScreen} />
      <FloatingButton title="Quick game" onPress={startQuickGame} />
      <NavIcon title="Ranks" icon="ranking" onPress={goToRankings} />
      <NavIcon
        title="Leagues"
        icon="league"
        iconFamily="material"
        onPress={goToLeagues}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'absolute',
      height: AN(70),
      justifyContent: 'space-evenly',
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
