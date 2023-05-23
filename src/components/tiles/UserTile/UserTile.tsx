import FeatherIcon from 'assets/icons/MyIcon';
import UserAvatar from 'components/icons/UserAvatar';
import Tag from 'components/misc/Tag';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL, AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ShallowUser } from 'store/types/authSliceTypes';

const UserTile = ({
  user,
  score,
  isReady,
  onPress = () => {},
  isOnline,
}: Props) => {
  const { styles } = useStyles(createStyles);

  const rightSideText = !!score ? `${String(score)} pts` : `lvl ${user.level}`;

  const onPressMe = () => {
    onPress(user);
  };

  return (
    <TileWrapper key={user.id} style={styles.container} onPress={onPressMe}>
      <View style={{ flexDirection: 'row' }}>
        <UserAvatar size={AN(22)} avatar={user.avatar} color={user.color} />
        <BodyMedium
          text={`${user.firstName} ${user.lastName}`}
          style={{ marginLeft: AN(10) }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isReady && (
          <>
            <BodyMedium text="Ready " color="success500" />
            <FeatherIcon
              name="check-circle"
              size={AN(14)}
              style={{ marginRight: AN(6) }}
              color="success500"
            />
          </>
        )}
        {isOnline && <View style={styles.onlineIndicator} />}
        <Tag text={rightSideText} color="brand500" />
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
    onlineIndicator: {
      backgroundColor: colors.success500,
      width: AN(7),
      aspectRatio: 1,
      borderRadius: AN(7),
      marginRight: AN(6),
    },
  });

export default UserTile;

interface Props {
  user: ShallowUser;
  score?: string;
  isReady?: boolean;
  onPress?: (user: ShallowUser) => void;
  isOnline?: boolean;
}
