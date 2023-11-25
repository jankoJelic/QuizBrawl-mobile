import MyIcon, { IconFamily, IconName } from 'assets/icons/MyIcon';
import FloatingButton from 'components/buttons/FloatingButton';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMyNavigation } from './hooks/useMyNavigation';
import { useAppSelector } from 'store/index';
import { LOBBY_IDS } from 'constants/constants';
import {
  createNewRoom,
  goToRoomScreen,
  goToSoloEvent,
} from './methods/goToRoomScreen';
import API from 'services/api';
import { useDispatch } from 'react-redux';
import { initializeGame } from 'store/slices/gameSlice';
import { navigate } from './MainStackNavigator';

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
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const navigation = useMyNavigation();
  const { rooms } = useAppSelector(state => state.data);

  const goTopMarket = () => {
    navigation.navigate('Market');
  };

  const goToFriendsScreen = () => {
    navigation.navigate('Friends');
  };

  const roomsByPriority = rooms
    .slice()
    .sort((a, b) => (a.lobbyId < b.lobbyId ? -1 : 1));

  const startQuickGame = async () => {
    try {
      console.log('here');
      const { questions, room } = await API.startQuickGame();
      console.log(questions, room);
      dispatch(initializeGame({ room, questions }));
      navigation.navigate('GameSplash', { room });
    } catch (error) {
      const availableRoom = roomsByPriority.find(
        r => !r.password && r.users.length < r.maxPlayers,
      );

      if (availableRoom) {
        if (availableRoom.lobbyId === LOBBY_IDS.SOLO) {
          goToSoloEvent(availableRoom);
        } else {
          goToRoomScreen(availableRoom);
        }
      } else {
        createNewRoom();
      }
    }
  };

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
