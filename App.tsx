import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { store } from './src/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FONTS } from './src/constants/styles/appStyles';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 40 }}>
            Crab Journeyyy
          </Text>
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
