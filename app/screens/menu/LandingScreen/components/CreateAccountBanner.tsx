import BodyLarge from "components/typography/BodyLarge";
import BodyMedium from "components/typography/BodyMedium";
import { Colors } from "constants/styles/Colors";
import { AN, PADDING_HORIZONTAL, SCREEN_WIDTH } from "constants/styles/appStyles";
import TileWrapper from "hoc/TileWrapper";
import useStyles from "hooks/styles/useStyles";
import { useMyNavigation } from "navigation/hooks/useMyNavigation";
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "store/index";

const CreateAccountBanner = () => {
  const navigation = useMyNavigation();
  const isGuest = useAppSelector((state) => state.data.userData?.isGuest);

  if (!isGuest) return null;

  const goToCreateAccount = () => {
    navigation.navigate("SelectProvider", { flow: "register" });
  };

  return (
    <TileWrapper style={styles.container} onPress={goToCreateAccount}>
      <Image
        source={require("../../../../assets/icons/lobbies/money.png")}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <BodyLarge text="Create account" color="brand500" />
          <View style={styles.rewardRow}>
            <BodyMedium text="+100" color="brand500" weight="bold" />
            <Image
              source={require("../../../../assets/icons/lobbies/money.png")}
              style={styles.coinIcon}
            />
          </View>
        </View>
        <BodyMedium
          text="Create account to earn rewards. Your progress will be saved"
          color="neutral300"
          style={styles.subtitle}
        />
      </View>
    </TileWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: AN(30),
    marginHorizontal: PADDING_HORIZONTAL,
    paddingVertical: AN(14),
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: AN(48),
    height: AN(48),
    marginRight: AN(12),
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: AN(8),
    marginBottom: AN(4),
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: AN(3),
  },
  coinIcon: {
    width: AN(16),
    height: AN(16),
  },
  subtitle: {
    width: SCREEN_WIDTH * 0.6,
  },
});

export default CreateAccountBanner;
