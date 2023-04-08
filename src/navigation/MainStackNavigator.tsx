import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './navConstants';
import WelcomeScreen from 'screens/auth/WelcomeScreen';
import SplashScreen from 'screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.Splash}>
    <Stack.Screen name={ROUTES.Splash} component={SplashScreen} />
    <Stack.Screen name={ROUTES.Welcome} component={WelcomeScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
