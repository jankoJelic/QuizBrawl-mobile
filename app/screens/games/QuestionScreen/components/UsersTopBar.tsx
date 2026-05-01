// import UserAvatar from 'components/icons/UserAvatar';
import BodySmall from "components/typography/BodySmall/BodySmall";
import { Colors } from "constants/styles/Colors";
import { AN, BORDER_RADIUS, SCREEN_WIDTH } from "constants/styles/appStyles";
import useStyles from "hooks/styles/useStyles";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useAppSelector } from "store/index";
import { normalizeImageUri } from "util/normalizeImageUri";
import { UserData } from "store/types/authSliceTypes";

const UsersTopBar = ({ wrongUsers, correctUser }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { activeRoom, score, leagueId } = useAppSelector((state) => state.game);
  const isLeagueGame = !!leagueId;
  const { users } = activeRoom || {};

  const renderUser = ({ item }: { item: UserData }) => {
    const borderColor = () => {
      if (wrongUsers.includes(item.id)) {
        return colors.danger500;
      } else if (correctUser === item.id) {
        return colors.brand500;
      } else {
        return colors.tileBackground;
      }
    };

    console.log(item.avatar);

    return (
      <View
        style={{
          ...styles.userTile,
          width: SCREEN_WIDTH / (users.length + 2),
          borderColor: borderColor(),
        }}
      >
        <Image
          style={{ width: AN(25), aspectRatio: 1 }}
          source={{ uri: normalizeImageUri(item.avatar) }}
        />
        <BodySmall text={item.firstName} style={{ marginTop: AN(2) }} />
        <BodySmall text={String(score[item.id])} />
      </View>
    );
  };
  return (
    <FlatList
      data={
        isLeagueGame ? users.filter((u) => u.id !== activeRoom.userId) : users
      }
      renderItem={renderUser}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item.id + "player" + String(index)}
      contentContainerStyle={styles.usersList}
    />
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    userTile: {
      borderRadius: BORDER_RADIUS,
      alignItems: "center",
      borderWidth: AN(1),
      padding: AN(10),
      justifyContent: "center",
    },
    usersList: {
      minWidth: SCREEN_WIDTH * 0.9,
      flexGrow: 1,
      justifyContent: "space-evenly",
      height: AN(70),
    },
  });

export default UsersTopBar;

interface Props {
  wrongUsers: number[];
  correctUser: number;
}
