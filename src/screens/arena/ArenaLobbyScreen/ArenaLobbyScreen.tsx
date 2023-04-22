import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FeatherIcon from 'assets/icons/FeatherIcon';
import NavBackArrow from 'components/icons/NavBackArrow';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {

  useEffect(() => {}, []);
  
  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <FeatherIcon name="arrow-left" color="arena" />
        <Title text="Arena" color="arena" />
        <Title text=" " />
      </View>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default ArenaLobbyScreen;
