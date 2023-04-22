import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamsList } from './navConstants';
import SplashScreen from 'screens/auth/SplashScreen';
import EnterPinCodeScreen from 'screens/auth/EnterPinCodeScreen';
import RegisterScreen from 'screens/auth/RegisterScreen/RegisterScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import LandingScreen from 'screens/game/LandingScreen';
import ProfileScreen from 'screens/game/ProfileScreen';
import SetupPinCodeScreen from 'screens/auth/SetupPinCodeScreen';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}>
    {/* AUTH SCREENS */}
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="EnterPinCode" component={EnterPinCodeScreen} />
    <Stack.Screen name="SetupPinCode" component={SetupPinCodeScreen} />

    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
