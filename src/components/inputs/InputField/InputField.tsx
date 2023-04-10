import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const InputField = () => {
  const { styles, colors } = useStyles(createStyles);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <TextInput
        style={[
          styles.inputField,
          {
            borderColor: isFocused ? colors.primaryGold : colors.neutral400,
          },
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    inputField: {
      borderRadius: BORDER_RADIUS,
      borderWidth: 1,
      width: '100%',
      marginVertical: AN(10),
    },
  });

export default InputField;
