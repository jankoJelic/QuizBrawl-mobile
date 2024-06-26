import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { signInWithGoogle } from 'services/googleAuth/loginWithGoogle';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import TermsOfUse from './TermsOfUse';

const SelectProviderScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'SelectProvider'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const { flow } = route.params || {};

  const isLoginFlow = flow === 'login';
  const action = isLoginFlow ? 'Sign in' : 'Register';

  const [termsVisible, setTermsVisible] = useState(false);

  const openTerms = () => {
    setTermsVisible(true);
  };

  const closeTerms = () => {
    setTermsVisible(false);
  };

  const initializeGoogleSignIn = async () => {
    dispatch(startLoading());

    try {
      await signInWithGoogle();
      await API.getUserData();
      navigation.navigate('Landing');
    } catch (e) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const chooseAuthWithEmail = () => {
    isLoginFlow
      ? navigation.navigate('Login')
      : navigation.navigate('Register');
  };

  const onPressCTA = () => {
    navigation.navigate(isLoginFlow ? 'Register' : 'Login');
  };

  return (
    <ScreenWrapper>
      <NavHeader
        title={`Select ${flow} method`}
        showRightIcon={false}
        style={{ marginBottom: SCREEN_HEIGHT * 0.2 }}
        showLeftIcon={flow === 'login'}
      />
      <Text style={{ marginBottom: SCREEN_HEIGHT * 0.05 }} onPress={openTerms}>
        <BodyLarge
          text="By registering, you are accepting"
          style={{ textAlign: 'center' }}
        />
        <BodyLarge text=" Quiz Clash terms of use" color="brand500" />
      </Text>
      {/* 
      <GhostButton
        title={`${action} with Google`}
        onPress={initializeGoogleSignIn}
        iconName="googleLogo"
      />
      <View style={styles.horizontalLineContainer}>
        <BodyMedium text="    or    " />
      </View> */}
      <GhostButton
        title={`${action} with e-mail`}
        onPress={chooseAuthWithEmail}
        iconName="mail"
        iconColor="neutral300"
      />
      <View style={styles.footer}>
        <BodyMedium
          text={
            isLoginFlow ? "Don't have an account?" : 'Already have an account?'
          }
          color="mainTextColor"
          style={styles.haveAnAccountText}
        />

        <CTA title={isLoginFlow ? 'Register' : 'Login'} onPress={onPressCTA} />
      </View>
      <TermsOfUse visible={termsVisible} close={closeTerms} />
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
    footer: {
      position: 'absolute',
      bottom: AN(10),
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    haveAnAccountText: { marginBottom: AN(6) },
  });

export default SelectProviderScreen;
