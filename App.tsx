import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { store, useAppSelector } from './src/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

function App(): JSX.Element {
  const { topColor, bottomColor } = useAppSelector(
    state => state.appState.statusBar,
  );

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 0, backgroundColor: topColor }} />
      <SafeAreaView style={{ backgroundColor: bottomColor, flex: 1 }}>
        <StatusBar backgroundColor={topColor} barStyle={'light-content'} />
        <MainStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
