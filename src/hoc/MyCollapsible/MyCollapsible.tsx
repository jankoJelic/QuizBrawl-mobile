import React from 'react';
import Collapsible from 'react-native-collapsible';

const MyCollapsible = ({ children, collapsed }: Props) => {
  return <Collapsible collapsed={collapsed}>{children}</Collapsible>;
};

export default MyCollapsible;

interface Props {
  children: JSX.Element | JSX.Element[];
  collapsed: boolean;
}
