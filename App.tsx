import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useAppSelector } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import FullScreenSpinner from './src/components/modals/FullScreenSpinner';
import Toast from 'components/modals/Toast';
import { configureGoogleSignIn } from 'services/googleAuth/configureGoogleSignIn';

function App(): JSX.Element {
  const { topColor, bottomColor } = useAppSelector(
    state => state.appState.statusBar,
  );

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 0, backgroundColor: topColor }} />
        <SafeAreaView style={{ backgroundColor: bottomColor, flex: 1 }}>
          <StatusBar backgroundColor={topColor} barStyle="light-content" />
          <MainStackNavigator />
          <FullScreenSpinner />
        </SafeAreaView>
        <Toast />
      </NavigationContainer>
    </>
  );
}

export default App;
