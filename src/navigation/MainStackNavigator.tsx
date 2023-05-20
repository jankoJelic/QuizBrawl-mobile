import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamsList } from './MainStackParamsList';
import SplashScreen from 'screens/auth/SplashScreen';
import EnterPinCodeScreen from 'screens/auth/EnterPinCodeScreen';
import RegisterScreen from 'screens/auth/RegisterScreen/RegisterScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import LandingScreen from 'screens/menu/LandingScreen';
import ProfileScreen from 'screens/menu/ProfileScreen';
import SetupPinCodeScreen from 'screens/auth/SetupPinCodeScreen';
import LobbyScreen from 'screens/LobbyScreen/LobbyScreen';
import CreateRoomScreen from 'screens/CreateRoomScreen';
import RoomScreen from 'screens/RoomScreen';
import GameSplashScreen from 'screens/games/GameSplashScreen';
import QuestionScreen from 'screens/games/QuestionScreen';
import ResultsScreen from 'screens/games/ResultsScreen';
import SelectProviderScreen from 'screens/auth/SelectProviderScreen';
import CustomizeProfileScreen from 'screens/menu/CustomizeProfileScreen';
import InboxScreen from 'screens/profile/InboxScreen';
import FriendsScreen from 'screens/menu/FriendsScreen';
import FriendScreen from 'screens/menu/FriendScreen';

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
    <Stack.Screen name="SelectProvider" component={SelectProviderScreen} />

    {/* PROFILE SCREENS */}
    <Stack.Screen name="CustomizeProfile" component={CustomizeProfileScreen} />
    <Stack.Screen name="Inbox" component={InboxScreen} />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ animation: 'slide_from_right' }}
    />

    <Stack.Screen name="Landing" component={LandingScreen} />

    <Stack.Screen name="Lobby" component={LobbyScreen} />

    <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
    <Stack.Screen name="Room" component={RoomScreen} />

    <Stack.Screen name="GameSplash" component={GameSplashScreen} />
    <Stack.Screen name="Question" component={QuestionScreen} />
    <Stack.Screen name="Results" component={ResultsScreen} />

    <Stack.Screen name="Friend" component={FriendScreen} />
    <Stack.Screen name="Friends" component={FriendsScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
