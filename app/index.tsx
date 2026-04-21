import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from 'store';
import MainStackNavigator, { navigationRef } from 'navigation/MainStackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} independent={true}>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
