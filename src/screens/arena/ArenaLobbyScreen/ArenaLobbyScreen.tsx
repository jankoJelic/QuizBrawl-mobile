import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FeatherIcon from 'assets/icons/FeatherIcon';
import NavBackArrow from 'components/icons/NavBackArrow';
import BodyLarge from 'components/typography/BodyLarge';
import HeadingH1 from 'components/typography/HeadingH1';
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <FeatherIcon name="arrow-left" color="arena" />
        <Title text="Arena" color="arena" />
        <Title text="X" />
      </View>

      <TileWrapper style={{ marginTop: AN(20) }}>
        <BodyLarge
          text="+ Create new room"
          color="mainTextColor"
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
