import { Colors } from 'constants/styles/Colors';
import useTheme from './useTheme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AN } from 'constants/styles/appStyles';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: Colors;
  styles: T;
  commonStyles: {
    ctaFooter: {};
    onlineIndicator: {};
  };
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (colors: Colors) => T,
): Styles<T> {
  const { colors } = useTheme();

  return {
    colors,
    styles: useMemo(() => createStyle(colors), [colors, createStyle]),
    commonStyles: {
      ctaFooter: { position: 'absolute', bottom: AN(10), alignSelf: 'center' },
      onlineIndicator: {
        backgroundColor: colors.success500,
        width: AN(7),
        aspectRatio: 1,
        borderRadius: AN(7),
        marginRight: AN(6),
      },
    },
  };
}
