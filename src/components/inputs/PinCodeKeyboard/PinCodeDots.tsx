import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PinCodeInputCircle from './PinCodeInputCircle';

const PinCodeDots = ({ input = '', error = '' }) => {
  return (
    <View style={styles.container}>
      <PinCodeInputCircle filled={!!input.length} error={error} />
      <PinCodeInputCircle filled={input.length > 1} error={error} />
      <PinCodeInputCircle filled={input.length > 2} error={error} />
      <PinCodeInputCircle filled={input.length > 3} error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: AN(24),
  },
});

export default PinCodeDots;
