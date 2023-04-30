import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { Pressable } from 'react-native';

const InfoLine = ({ title = '', value = '', onPress = () => {} }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: AN(5),
      }}>
      <BodyLarge text={title} style={{ marginRight: AN(20) }} />
      <BodyLarge text={value} color="brand500" weight="bold" />
    </Pressable>
  );
};

export default InfoLine;
