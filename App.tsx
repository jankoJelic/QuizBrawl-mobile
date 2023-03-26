import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';
import {store} from './src/store';
import {Provider} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Text>Crab Journey</Text>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
