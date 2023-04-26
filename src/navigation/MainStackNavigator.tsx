import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamsList } from './navConstants';
import SplashScreen from 'screens/auth/SplashScreen';
import EnterPinCodeScreen from 'screens/auth/EnterPinCodeScreen';
import RegisterScreen from 'screens/auth/RegisterScreen/RegisterScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import LandingScreen from 'screens/menu/LandingScreen';
import ProfileScreen from 'screens/menu/ProfileScreen';
import SetupPinCodeScreen from 'screens/auth/SetupPinCodeScreen';
import { slideScreenFromLeft } from './config/slideScreenFromLeft';
import ArenaLobbyScreen from 'screens/arena/ArenaLobbyScreen/ArenaLobbyScreen';
import CreateArenaRoomScreen from 'screens/arena/CreateArenaRoomScreen';
import ArenaRoomScreen from 'screens/arena/ArenaRoomScreen';

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
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ animation: 'slide_from_left' }}
    />

    <Stack.Screen name="ArenaLobby" component={ArenaLobbyScreen} />
    <Stack.Screen name="CreateArenaRoom" component={CreateArenaRoomScreen} />
    <Stack.Screen name="ArenaRoom" component={ArenaRoomScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
