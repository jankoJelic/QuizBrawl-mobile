import UserAvatar from 'components/icons/UserAvatar';
import NotificationBadge from 'components/misc/NotificationBadge';
import Tag from 'components/misc/Tag';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import { useUserData } from 'hooks/useUserData';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { showSideBar } from 'store/slices/appStateSlice';

const LandingScreenHeader = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);
  const { notificationsCount } = useUserData();

  const openSideBar = () => {
    dispatch(showSideBar());
  };

  return (
    <Pressable style={styles.header} onPress={openSideBar}>
      <View>
        <Title text={`Hi, ${userData.firstName}`} color="mainTextColor" />
        <BodyMedium text="Wanna play a little game?" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Tag
          text={`lvl ${String(userData.level)}`}
          style={{ marginRight: AN(8) }}
          color="brand500"
        />
        <UserAvatar onPress={openSideBar} />
      </View>
      {notificationsCount?.length ? (
        <NotificationBadge
          text={String(notificationsCount.length)}
          style={{ position: 'absolute', top: AN(2), right: AN(6) }}
        />
      ) : (
        <></>
      )}
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    trophiesContainer: {
      flexDirection: 'row',
    },
    trophiesCount: { marginLeft: AN(6) },
  });

export default React.memo(LandingScreenHeader);
