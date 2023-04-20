import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const InputField = ({
  title = '',
  onSubmitEditing = () => {},
  secureTextEntry = false,
}) => {
  const { styles, colors } = useStyles(createStyles);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <BodyLarge text={title} style={styles.title} />
      <TextInput
        style={[
          styles.inputField,
          {
            borderColor: isFocused ? colors.brand500 : colors.neutral400,
          },
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    inputField: {
      borderRadius: BORDER_RADIUS,
      borderWidth: 1,
      width: '100%',
      marginVertical: AN(10),
      color: colors.mainTextColor,
      paddingLeft: AN(12),
    },
    container: {
      marginVertical: AN(12),
    },
    title: {
      left: AN(5),
    },
  });

export default InputField;
