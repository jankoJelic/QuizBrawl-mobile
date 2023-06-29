import MyIcon from 'assets/icons/MyIcon';
import UserAvatar from 'components/icons/UserAvatar';
import BodyLarge from 'components/typography/BodyLarge';
import { Color, Colors } from 'constants/styles/Colors';
import {
  AN,
  SCREEN_WIDTH,
  PADDING_HORIZONTAL,
} from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { setColorOpacity } from 'util/strings/setColorOpacity';
import ProfileBadge from './ProfileBadge';
import { useAppSelector } from 'store/index';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import { UserData } from 'store/types/authSliceTypes';
import API from 'services/api';

const ProfileHeader = ({ user }: Props) => {
  const navigation = useMyNavigation();
  const { colors, styles } = useStyles(createStyles);
  const data = user ? user : useAppSelector(state => state.data.userData);
  const {
    firstName,
    lastName,
    avatar,
    trophies,
    color,
    level,
    isPremium,
    createdAt,
    accuracyPercentage,
    id,
  } = data || {};

  const [rank, setRank] = useState<number | undefined>(undefined);

  const getUserRank = async () => {
    try {
      const fetchedRank = await API.getUserRank(id);
      setRank(fetchedRank);
    } catch (error) {
      setRank(0);
    }
  };

  useEffect(() => {
    getUserRank();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <LinearGradient
        colors={[color as string, setColorOpacity(colors.neutral500, 0.6)]}
        style={styles.linearGradient}
      />
      <MyIcon
        name="arrow-left"
        style={styles.arrowLeft}
        color="neutral500"
        size={AN(22)}
        onPress={navigation.goBack}
      />
      <UserAvatar
        avatar={avatar}
        color={colors.neutral500}
        size={SCREEN_WIDTH * 0.2}
      />

      <BodyLarge
        text={`${firstName} ${lastName}`}
        style={{ marginTop: AN(4) }}
      />
      <View style={styles.profileBadges}>
        <ProfileBadge
          amount={String(rank)}
          imageSource={require('../../../../assets/icons/lobbies/shield.png')}
          color="brand500"
        />
        <ProfileBadge
          imageSource={require('../../../../assets/icons/trophy.png')}
          amount={String(trophies)}
          color="warning500"
        />
        <ProfileBadge
          imageSource={require('../../../../assets/icons/ranking.png')}
          amount={!!rank ? String(rank) : 'n/a'}
          color="danger500"
          isLoading={rank === undefined}
        />
      </View>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    arrowLeft: {
      position: 'absolute',
      left: PADDING_HORIZONTAL,
      top: AN(10),
    },
    profileBadges: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: AN(6),
    },
    container: {
      alignItems: 'center',
      paddingTop: AN(30),
      borderBottomLeftRadius: SCREEN_WIDTH / 7,
      borderBottomRightRadius: SCREEN_WIDTH / 7,
      paddingBottom: AN(10),
      overflow: 'hidden',
    },
    linearGradient: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      height: '100%',
    },
  });

export default React.memo(ProfileHeader);

interface Props {
  user?: UserData | undefined;
}
