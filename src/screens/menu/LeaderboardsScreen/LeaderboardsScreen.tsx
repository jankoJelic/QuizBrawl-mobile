import UserAvatar from 'components/icons/UserAvatar';
import NavHeader from 'components/layout/NavHeader';
import FullScreenSpinner from 'components/modals/FullScreenSpinner';
import UserTile from 'components/tiles/UserTile/UserTile';
import BodyMedium from 'components/typography/BodyMedium';
import { Color, Colors } from 'constants/styles/Colors';
import {
  AN,
  BORDER_RADIUS,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { setStatusBar } from 'store/slices/appStateSlice';
import { ShallowUser } from 'store/types/authSliceTypes';
import { setColorOpacity } from 'util/strings/setColorOpacity';
import LinearGradient from 'react-native-linear-gradient';
import UserActionSheet from 'containers/ActionSheet/UserActionSheet';
import MyIcon from 'assets/icons/MyIcon';

const LeaderboardsScreen = () => {
  const { styles, colors } = useStyles(createStyles);
  const dispatch = useDispatch();

  const [players, setPlayers] = useState<ShallowUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ShallowUser>();

  const getLeaderboards = async () => {
    const users = await API.getLeaderboards();
    dispatch(setStatusBar({ topColor: users[0].color }));
    setPlayers(users);
  };

  useEffect(() => {
    getLeaderboards();
  }, []);

  const renderPlayer = ({
    item,
    index,
  }: {
    item: ShallowUser;
    index: number;
  }) => (
    <UserTile
      user={item}
      showTrophies
      rank={index + 4}
      onPress={() => {
        setSelectedUser(item);
      }}
    />
  );

  const closeUserActionSheet = () => {
    setSelectedUser(undefined);
  };

  const renderTrophyCount = ({
    count,
    color,
  }: {
    count: number;
    color: Color;
  }) => (
    <View style={{ flexDirection: 'row' }}>
      <BodyMedium text={String(count)} color={color} />
      <MyIcon name="trophy" />
    </View>
  );

  const renderSecondPlayer = () => (
    <View style={{ alignItems: 'center', top: AN(20), left: AN(15) }}>
      <BodyMedium text="#2" />
      <UserAvatar
        avatar={players[1].avatar}
        color={players[1].color}
        showBorder
        size={AN(65)}
        style={{ borderColor: colors.silver, borderWidth: 5 }}
      />
      <BodyMedium text={players[1].firstName} />
      {renderTrophyCount({
        color: 'mainTextColor',
        count: players[1].trophies,
      })}
    </View>
  );

  const renderFirstPlayer = () => (
    <View style={{ alignItems: 'center' }}>
      <BodyMedium text="#1" color="gold" />
      <UserAvatar
        avatar={players[0].avatar}
        color={players[0].color}
        showBorder
        size={AN(65)}
        style={{ borderColor: colors.gold, borderWidth: 5 }}
      />
      <BodyMedium text={players[0].firstName} color="gold" />
      {renderTrophyCount({
        color: 'gold',
        count: players[0].trophies,
      })}
    </View>
  );

  const renderThirdPlayer = () => (
    <View style={{ alignItems: 'center', top: AN(30), right: AN(15) }}>
      <BodyMedium text="#3" color="bronze" />
      <UserAvatar
        avatar={players[2].avatar}
        color={players[2].color}
        showBorder
        size={AN(65)}
        style={{
          borderColor: colors.bronze,
          borderWidth: 5,
        }}
      />
      <BodyMedium text={players[2].firstName} color="bronze" />
      {renderTrophyCount({
        color: 'bronze',
        count: players[2].trophies,
      })}
    </View>
  );

  return (
    <ScreenWrapper fullWidth>
      {!players.length ? (
        <FullScreenSpinner />
      ) : (
        <View>
          <NavHeader
            fullWidth
            title=""
            color="neutral500"
            style={{ ...styles.navHeader, backgroundColor: players[0].color }}
          />
          <View
            style={{
              ...styles.top3Players,
              backgroundColor: players[0].color,
            }}>
            <LinearGradient
              colors={[
                players[0]?.color as string,
                setColorOpacity(colors.neutral500, 0.6),
              ]}
              style={styles.linearGradient}
            />
            {renderSecondPlayer()}
            {renderFirstPlayer()}
            {renderThirdPlayer()}
          </View>
          <FlatList
            data={players.slice(3, players.length - 1)}
            renderItem={renderPlayer}
            keyExtractor={player => String(player.id) + 'leaderboards'}
            contentContainerStyle={styles.leaderboardsList}
          />
        </View>
      )}
      <UserActionSheet
        visible={!!selectedUser}
        closeModal={closeUserActionSheet}
        selectedUser={selectedUser}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    navHeader: {
      marginTop: 0,
      marginBottom: 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingTop: AN(20),
    },
    leaderboardsList: {
      paddingBottom: AN(400),
      paddingHorizontal: PADDING_HORIZONTAL,
      marginTop: AN(20),
    },
    top3Players: {
      flexDirection: 'row',
      width: SCREEN_WIDTH,
      justifyContent: 'space-around',
      paddingTop: AN(20),
      height: AN(180),
      borderBottomLeftRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
    },
    linearGradient: {
      width: SCREEN_WIDTH,
      position: 'absolute',
      bottom: 0,
      height: '100%',
      left: 0,
    },
  });

export default LeaderboardsScreen;
