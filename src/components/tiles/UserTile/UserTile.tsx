import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import {
  PADDING_HORIZONTAL,
  AN,
  BORDER_RADIUS,
} from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { UserData } from 'store/types/authSliceTypes';

const UserTile = ({ user }: Props) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <TileWrapper key={user.id} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <UserAvatar size={AN(22)} />
        <BodyMedium
          text={`${user.firstName} ${user.lastName}`}
          style={{ marginLeft: AN(10) }}
        />
      </View>
      <View style={styles.levelContainer}>
        <BodyMedium text={`lvl ${user.level}`} />
      </View>
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: PADDING_HORIZONTAL,
      marginVertical: AN(2),
    },
    levelContainer: {
      borderWidth: AN(1),
      borderRadius: BORDER_RADIUS,
      padding: AN(4),
      paddingHorizontal: AN(10),
      borderColor: colors.arena,
    },
  });

export default UserTile;

interface Props {
  user: UserData;
}
