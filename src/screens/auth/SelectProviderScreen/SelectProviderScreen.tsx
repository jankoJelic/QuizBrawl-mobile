import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { signInWithGoogle } from 'services/googleAuth/loginWithGoogle';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const SelectProviderScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'SelectProvider'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);

  const initializeGoogleSignIn = async () => {
    dispatch(startLoading());

    try {
      await signInWithGoogle();
      await API.getUserData();
      navigation.navigate('Landing');
    } catch (e) {
      console.log(JSON.stringify(e));
    } finally {
      dispatch(stopLoading());
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScreenWrapper>
      <NavHeader
        title="Select login method"
        showRightIcon={false}
        style={{ marginBottom: SCREEN_HEIGHT * 0.2 }}
      />

      <GhostButton
        title="Sign in with Google"
        onPress={initializeGoogleSignIn}
        iconName="googleLogo"
      />
      <View style={styles.horizontalLineContainer}>
        <BodyMedium text="    or    " />
      </View>
      <GhostButton
        title="Sign in with email"
        onPress={goToLogin}
        iconName="mail"
        iconColor="neutral300"
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    horizontalLine: {
      width: '45%',
      height: AN(1),
      backgroundColor: colors.neutral400,
    },
    horizontalLineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: AN(24),
    },
  });

export default SelectProviderScreen;
