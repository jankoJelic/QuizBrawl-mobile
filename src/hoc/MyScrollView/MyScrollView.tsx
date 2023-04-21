import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const MyScrollView = ({ children, style = {} }: Props) => {
  return (
    <ScrollView
      style={[styles.content, style]}
      contentContainerStyle={[styles.content, style]}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
  },
});

export default MyScrollView;

interface Props {
  children: JSX.Element[];
  style?: {};
}
