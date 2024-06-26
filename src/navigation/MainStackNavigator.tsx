import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
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
import MarketScreen from 'screens/menu/MarketScreen';
import CreateQuizScreen from 'screens/menu/CreateQuizScreen';
import QuizesScreen from 'screens/menu/MyQuizesScreen';
import LeaguesScreen from 'screens/leagues/LeaguesScreen';
import LeagueScreen from 'screens/leagues/LeagueScreen';
import CreateLeagueScreen from 'screens/leagues/CreateLeagueScreen';
import LeaderboardsScreen from 'screens/menu/LeaderboardsScreen';
import AboutScreen from 'screens/menu/AboutScreen';

const Stack = createNativeStackNavigator<MainStackParamsList>();

export const navigationRef = createNavigationContainerRef();

export function navigate(name: keyof MainStackParamsList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

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
    <Stack.Screen name="About" component={AboutScreen} />
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

    <Stack.Screen name="Friends" component={FriendsScreen} />
    <Stack.Screen name="Market" component={MarketScreen} />
    <Stack.Screen name="Leaderboards" component={LeaderboardsScreen} />

    <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
    <Stack.Screen name="MyQuizes" component={QuizesScreen} />

    <Stack.Screen name="Leagues" component={LeaguesScreen} />
    <Stack.Screen name="League" component={LeagueScreen} />
    <Stack.Screen name="CreateLeague" component={CreateLeagueScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;
