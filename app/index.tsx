import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { store } from 'store';
import MainStackNavigator, { navigationRef } from 'navigation/MainStackNavigator';
import { configureGoogleSignIn } from 'services/googleAuth/configureGoogleSignIn';

SplashScreen.preventAutoHideAsync();
configureGoogleSignIn();

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
