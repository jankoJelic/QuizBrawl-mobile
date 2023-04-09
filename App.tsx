import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { store } from './src/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainStackNavigator from './src/navigation/MainStackNavigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
