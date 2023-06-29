import MyIcon from 'assets/icons/MyIcon';
import FeatherIcon from 'assets/icons/MyIcon';
import UserAvatar from 'components/icons/UserAvatar';
import Tag from 'components/misc/Tag';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL, AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import { useUserData } from 'hooks/useUserData';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useAppSelector } from 'store/index';
import { ShallowUser } from 'store/types/authSliceTypes';

const UserTile = ({
  user,
  score,
  isReady,
  onPress = () => {},
  isOnline,
  showTrophies = false,
  rank,
}: Props) => {
  const { styles, commonStyles } = useStyles(createStyles);
  const { userLevel } = useUserData();
  const { id } = useAppSelector(state => state.data.userData);

  const rightSideText = showTrophies
    ? String(user.trophies)
    : !!score
    ? `${String(score)} pts`
    : userLevel;

  const onPressMe = () => {
    onPress(user);
  };

  return (
    <TileWrapper key={user.id} style={styles.container} onPress={onPressMe}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {rank && <BodyMedium text={String(rank)} style={{ right: AN(6) }} />}
        <UserAvatar size={AN(22)} avatar={user.avatar} color={user.color} />
        <BodyMedium
          text={`${user.firstName} ${user.lastName}`}
          style={{ marginLeft: AN(10) }}
          color={user.id === id ? 'brand500' : 'mainTextColor'}
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
        {isOnline && <View style={commonStyles.onlineIndicator} />}
        <Tag text={rightSideText} color="brand500" />
        {showTrophies && <MyIcon name="trophy" />}
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
  });

export default UserTile;

interface Props {
  user: ShallowUser;
  score?: string;
  isReady?: boolean;
  onPress?: (user: ShallowUser) => void;
  isOnline?: boolean;
  showTrophies?: boolean;
  rank?: number;
}
