import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { Pressable } from 'react-native';

const InfoLine = ({
  title = '',
  value = '',
  onPress = () => {},
  AdditionalContent = <></>,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: AN(5),
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <BodyLarge text={title} style={{ marginRight: AN(20) }} />
      <BodyLarge text={value} color="brand500" weight="bold" />
      {AdditionalContent}
    </Pressable>
  );
};

export default InfoLine;
