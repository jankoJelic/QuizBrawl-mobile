import { Colors } from 'constants/styles/Colors';
import useTheme from './useTheme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: Colors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (colors: Colors) => T,
): Styles<T> {
  const { colors } = useTheme();

  return {
    colors,
    styles: useMemo(() => createStyle(colors), [colors, createStyle]),
  };
}
