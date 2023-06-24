import React, { useEffect } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';
import { useAppSelector } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import FullScreenSpinner from './src/components/modals/FullScreenSpinner';
import Toast from 'components/modals/Toast';
import { configureGoogleSignIn } from 'services/googleAuth/configureGoogleSignIn';
import { enableScreens } from 'react-native-screens';
import Reward from 'containers/Reward/Reward';

function App(): JSX.Element {
  const {
    statusBar: { topColor, bottomColor },
  } = useAppSelector(state => state.appState);

  useEffect(() => {
    configureGoogleSignIn();
    enableScreens();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <NavigationContainer>
        <SafeAreaView style={{ flex: 0, backgroundColor: topColor }} />
        <SafeAreaView style={{ backgroundColor: bottomColor, flex: 1 }}>
          <StatusBar backgroundColor={topColor} barStyle="light-content" />
          <MainStackNavigator />
          <FullScreenSpinner />
        </SafeAreaView>
        <Toast />
        <Reward />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

export default App;
