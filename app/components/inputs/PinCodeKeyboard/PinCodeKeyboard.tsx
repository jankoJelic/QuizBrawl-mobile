import React from 'react';
import { FlatList } from 'react-native';
import PinCodeButton from './PinCodeButton';
import { AN } from 'constants/styles/appStyles';
import BodyMedium from 'components/typography/BodyMedium';

const PinCodeKeyboard = ({ onPressButton, errorMessage }: Props) => {
  const buttons = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '0',
    'backspace',
  ];

  const renderItem = ({ item }: { item: string }) => (
    <PinCodeButton
      character={item}
      icon={item === 'backspace' ? 'delete' : undefined}
      onPress={onPressButton}
    />
  );

  return (
    <>
      <BodyMedium
        text={errorMessage}
        color="danger400"
        style={{ alignSelf: 'center', marginTop: AN(10) }}
      />
      <FlatList
        data={buttons}
        scrollEnabled={false}
        renderItem={renderItem}
        numColumns={3}
        style={{ alignSelf: 'center', marginVertical: AN(20) }}
      />
    </>
  );
};

export default PinCodeKeyboard;

interface Props {
  onPressButton: (c: string) => void;
  errorMessage: string;
}
