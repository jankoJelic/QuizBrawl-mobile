import UserAvatar from 'components/icons/UserAvatar';
import Tag from 'components/misc/Tag';
import BodyMedium from 'components/typography/BodyMedium';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from 'store/index';

const UserInfoTile = () => {
  const { firstName, lastName, email, level } = useAppSelector(
    state => state.data.userData,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <UserAvatar />
      <View style={{ marginLeft: AN(20) }}>
        <BodyMedium text={`${firstName} ${lastName}`} />
        <BodyMedium text={email} color="brand500" />
      </View>
    </View>
  );
};

export default UserInfoTile;
