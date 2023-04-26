import FeatherIcon, { IconName } from 'assets/icons/FeatherIcon';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

const InputField = forwardRef((props: Props, ref) => {
  const { autoFocus, title, autoCapitalize = 'none', icon } = props;
  const inputRef = useRef<TextInput>();
  const { styles, colors } = useStyles(createStyles);
  const [isFocused, setisFocused] = useState(false);
  const [isSecured, setIsSecured] = useState(icon === 'eye');

  useEffect(() => {
    if (autoFocus) {
      onFocus();
    }
  }, []);

  const onFocus = () => {
    inputRef?.current?.focus();
    setisFocused(true);
  };

  const onBlur = () => {
    setisFocused(false);
  };

  useImperativeHandle(ref, () => ({
    focus: onFocus,
  }));

  const onPressIcon = () => {
    setIsSecured(!isSecured);
  };

  return (
    <View style={styles.container}>
      <BodyLarge
        text={title}
        style={styles.title}
        color={isFocused ? 'brand400' : 'mainTextColor'}
      />
      <TextInput
        ref={inputRef}
        style={[
          styles.inputField,
          {
            borderColor: isFocused ? colors.brand500 : colors.neutral400,
          },
        ]}
        selectionColor={colors.brand500}
        cursorColor={colors.brand500}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isSecured}
        {...props}
      />
      {!!props.icon && (
        <FeatherIcon
          name={isSecured ? 'eye' : 'eye-off'}
          onPress={onPressIcon}
          style={styles.eyeIcon}
          color={isFocused ? 'brand500' : 'neutral300'}
        />
      )}
    </View>
  );
});

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    inputField: {
      borderRadius: BORDER_RADIUS,
      borderWidth: 1,
      width: '100%',
      marginBottom: AN(3),
      color: colors.mainTextColor,
      paddingLeft: AN(12),
      height: AN(36),
      marginTop: AN(2),
    },
    container: {
      marginVertical: AN(12),
    },
    title: {
      left: AN(5),
      marginBottom: AN(2),
    },
    eyeIcon: { position: 'absolute', right: AN(12), bottom: AN(11) },
  });

export default InputField;

interface Props extends TextInputProps {
  title?: string;
  icon?: IconName;
}
