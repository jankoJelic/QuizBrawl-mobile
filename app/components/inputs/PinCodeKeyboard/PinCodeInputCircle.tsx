import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PinCodeInputCircle = ({ filled = false, error = '' }) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <View
      style={[
        styles.component,
        {
          backgroundColor: !!error
            ? colors.danger400
            : filled
            ? colors.brand500
            : 'transparent',
          borderColor: !!error ? colors.danger400 : colors.brand500,
        },
      ]}
    />
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    component: {
      width: AN(12),
      aspectRatio: 1,
      borderRadius: AN(12),
      borderWidth: 1,
      borderColor: colors.brand500,
      margin: AN(3),
    },
  });

export default PinCodeInputCircle;
