import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import { lightThemeColors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { getKeyByValue } from 'util/objects/getKeyByValue';

const UserInfoTile = ({ onPress = () => {} }) => {
  const { firstName, lastName, email, color } = useAppSelector(
    state => state.data.userData,
  );

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <UserAvatar onPress={onPress} />
      <View style={{ marginLeft: AN(20) }}>
        <BodyMedium text={`${firstName} ${lastName}`} />
        <BodyMedium
          text={email}
          color={getKeyByValue(lightThemeColors, color)}
        />
      </View>
    </Pressable>
  );
};

export default UserInfoTile;
