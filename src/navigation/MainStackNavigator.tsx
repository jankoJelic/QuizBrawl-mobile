import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './navConstants';
import SplashScreen from 'screens/auth/SplashScreen';
import EnterPinCodeScreen from 'screens/auth/EnterPinCodeScreen';
import RegisterScreen from 'screens/auth/RegisterScreen/RegisterScreen';
import LoginScreen from 'screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.Splash}>
    {/* AUTH SCREENS */}
    <Stack.Screen
      name={ROUTES.Splash}
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={ROUTES.Register} component={RegisterScreen} />
    <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
    <Stack.Screen name={ROUTES.EnterPinCode} component={EnterPinCodeScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
