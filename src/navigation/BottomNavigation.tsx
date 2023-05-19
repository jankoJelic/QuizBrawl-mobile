import MyIcon from 'assets/icons/MyIcon';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const BottomNavigation = () => {
  const { colors, styles } = useStyles(createStyles);
  
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        height: AN(54),
        justifyContent: 'space-around',
        bottom: 0,
        backgroundColor: colors.tileBackground,
        width: '100%',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="users" />
        <BodySmall text="Friends" color="brand500" />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MyIcon name="shopping-cart" color="neutral400" />
        <BodySmall text="Shop" color="neutral400" />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default BottomNavigation;
