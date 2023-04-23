import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FeatherIcon from 'assets/icons/FeatherIcon';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {
  const getArenaRooms = () => {};

  useEffect(() => {}, []);

  return (
    <ScreenWrapper>
      <NavHeader title="Arena" fullWidth />
      <TileWrapper style={{ marginTop: AN(20) }}>
        <BodyLarge
          text="+   Create new room"
          color="brand500"
          onPress={() => {
            navigation.navigate('CreateArenaRoom');
          }}
        />
      </TileWrapper>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default ArenaLobbyScreen;
