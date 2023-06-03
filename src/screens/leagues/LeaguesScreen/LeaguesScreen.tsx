import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { League } from 'services/api/endpoints/leaguesAPI';
import { useAppSelector } from 'store/index';

const LeaguesScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Leagues'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);

  const { leagues } = useAppSelector(state => state.leagues);

  const onPressCreateLeague = () => {
    navigation.navigate('CreateLeague');
  };

  const renderItem = ({ item }: { item: League }) => {
    const { image, name, bet, password, users, createdAt, type } = item || {};

    return (
      <TileWrapper
        style={{
          flexDirection: 'row',
          marginBottom: AN(14),
          padding: AN(12),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            style={{ height: AN(40), aspectRatio: 1, marginRight: AN(16) }}
            source={{ uri: image }}
          />
          <View>
            <BodyLarge text={name} />
            <BodyMedium
              text={`${String(users?.length)} player(s)`}
              color="neutral300"
            />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <BodySmall
            text={`since ${new Date(createdAt).toLocaleDateString()}`}
            style={{ textAlign: 'right', marginBottom: AN(4) }}
            color="neutral300"
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BodySmall
              text={`type: ${type}`}
              color="neutral300"
              style={{ marginRight: AN(4) }}
            />
            {!bet ? (
              <MyIcon
                name="money"
                size={AN(10)}
                style={{ marginRight: AN(4) }}
              />
            ) : (
              <></>
            )}
            <MyIcon
              name={password ? 'lock' : 'unlock'}
              color={password ? 'danger500' : 'success500'}
              size={AN(10)}
            />
          </View>
        </View>
      </TileWrapper>
    );
  };

  return (
    <ScreenWrapper>
      <NavHeader fullWidth title="Leagues" />
      <BodyLarge />
      <FlatList data={leagues} renderItem={renderItem} />
      <CTA
        title="Create new league"
        onPress={onPressCreateLeague}
        style={{ position: 'absolute', bottom: AN(10), alignSelf: 'center' }}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LeaguesScreen;
