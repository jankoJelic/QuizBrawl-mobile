import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MyIcon from "assets/icons/MyIcon";
import GhostButton from "components/buttons/GhostButton/GhostButton";
import NavHeader from "components/layout/NavHeader";
import BodyLarge from "components/typography/BodyLarge";
import BodyMedium from "components/typography/BodyMedium";
import { AVATAR_PRICE } from "constants/constants";
import { Colors } from "constants/styles/Colors";
import { AN, SCREEN_WIDTH } from "constants/styles/appStyles";
import ScreenWrapper from "hoc/ScreenWrapper";
import TouchableBounce from "hoc/TouchableBounce";
import useStyles from "hooks/styles/useStyles";
import { MainStackParamsList } from "navigation/MainStackParamsList";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import API from "services/api";
import { normalizeImageUri } from "util/normalizeImageUri";
import { MarketResponse } from "services/api/endpoints/rewardsAPI";
import { useAppSelector } from "store/index";
import { startLoading, stopLoading } from "store/slices/appStateSlice";
import { storeReward, updateBalance } from "store/slices/dataSlice";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const MarketScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, "Market">
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const [market, setMarket] = useState<MarketResponse>();
  const [purchasedAvatar, setPurchasedAvatar] = useState<string | null>(null);
  const { userData } = useAppSelector((state) => state.data);
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
    const avatarOwned = userData?.avatars?.includes(item);
    const disabled = money < AVATAR_PRICE || avatarOwned;

    const buyAvatar = async () => {
      dispatch(startLoading());

      try {
        await API.makeMarketPurchase({ type: "avatar", payload: item });
        dispatch(storeReward({ payload: item, type: "AVATAR" }));
        dispatch(updateBalance(-AVATAR_PRICE));
        setPurchasedAvatar(item);
      } catch (error) {
      } finally {
        dispatch(stopLoading());
      }
    };

    return (
      <TouchableBounce
        onPress={buyAvatar}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <Image
          source={{ uri: normalizeImageUri(item) }}
          style={styles.avatar}
        />
        {avatarOwned && (
          <MyIcon
            name="check"
            size={20}
            color="white"
            style={styles.ownedBadge}
          />
        )}
      </TouchableBounce>
    );
  };

  if (purchasedAvatar) {
    return (
      <ScreenWrapper>
        <NavHeader title="Market" fullWidth />
        <View style={styles.purchaseConfirmation}>
          <Image
            source={{ uri: normalizeImageUri(purchasedAvatar) }}
            style={styles.purchasedAvatarImage}
          />
          <BodyLarge text="Avatar purchased" style={{ marginTop: AN(20) }} />
          <GhostButton
            title="Equip now"
            onPress={() => navigation.navigate("CustomizeProfile")}
            style={{ marginTop: AN(12) }}
          />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <NavHeader title="Market" fullWidth />
      <BodyLarge
        text={`Balance:  ${money}$`}
        style={{ marginBottom: AN(20) }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <BodyMedium text="Avatars   " />
        <MyIcon name="money" />
        <BodyMedium
          text={` ${AVATAR_PRICE}`}
          color={money >= AVATAR_PRICE ? "brand500" : "neutral400"}
        />
      </View>
      <FlatList
        data={avatars || []}
        renderItem={renderAvatar}
        numColumns={4}
        contentContainerStyle={{ width: "100%", marginTop: AN(20) }}
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
      margin: "2%",
      marginBottom: AN(15),
    },
    purchaseConfirmation: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    purchasedAvatarImage: {
      width: SCREEN_WIDTH * 0.4,
      aspectRatio: 1,
      borderRadius: SCREEN_WIDTH * 0.2,
    },
    ownedBadge: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 20,
      height: 20,
      backgroundColor: colors.vividGreen,
      borderRadius: 10,
    },
  });

export default MarketScreen;
