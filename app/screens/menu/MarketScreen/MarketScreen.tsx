import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyIcon from 'assets/icons/MyIcon';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { AVATAR_PRICE } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { MarketResponse } from 'services/api/endpoints/rewardsAPI';
import { useAppSelector } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { storeReward, updateBalance } from 'store/slices/dataSlice';

const MarketScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Market'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const [market, setMarket] = useState<MarketResponse>();
  const { userData } = useAppSelector(state => state.data);
  const { money } = userData || {};
  const { avatars } = market || {};

  const getMarketData = async () => {
    dispatch(startLoading());
    try {
      const marketData = await API.getMarket();
      setMarket(marketData);
    } catch (error) {
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getMarketData();
  }, []);

  const renderAvatar = ({ item }: { item: string }) => {
    const buyAvatar = async () => {
      dispatch(startLoading());

      try {
        await API.makeMarketPurchase({ type: 'avatar', payload: item });
        dispatch(storeReward({ payload: item, type: 'AVATAR' }));
        dispatch(updateBalance(AVATAR_PRICE));
        navigation.navigate('CustomizeProfile');
      } catch (error) {
      } finally {
        dispatch(stopLoading());
      }
    };

    return (
      <TouchableBounce onPress={buyAvatar} disabled={money < AVATAR_PRICE}>
        <FastImage source={{ uri: item }} style={styles.avatar} />
      </TouchableBounce>
    );
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Market" fullWidth />
      <BodyLarge
        text={`Balance:  ${money}$`}
        style={{ marginBottom: AN(20) }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BodyMedium text="Avatars   " />
        <MyIcon name="money" />
        <BodyMedium
          text={` ${AVATAR_PRICE}`}
          color={money >= AVATAR_PRICE ? 'brand500' : 'neutral400'}
        />
      </View>
      <FlatList
        data={avatars || []}
        renderItem={renderAvatar}
        numColumns={4}
        contentContainerStyle={{ width: '100%', marginTop: AN(20) }}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    avatar: {
      width: SCREEN_WIDTH * 0.2,
      aspectRatio: 1,
      maxWidth: 250,
      margin: '2%',
      marginBottom: AN(15),
    },
  });

export default MarketScreen;
