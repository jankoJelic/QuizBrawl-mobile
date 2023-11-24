import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const MyScrollView = ({ children, style = {} }: Props) => {
  return (
    <ScrollView
      style={[style]}
      contentContainerStyle={[styles.content, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flexGrow: 1,
    paddingBottom: AN(50),
  },
});

export default MyScrollView;

interface Props {
  children: JSX.Element[];
  style?: {};
}
