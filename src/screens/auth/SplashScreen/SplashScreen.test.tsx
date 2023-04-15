import { Provider } from 'react-redux';
import SplashScreen from './SplashScreen';
import { render } from '@testing-library/react-native';
import { store } from '../../../store';

it('renders logo', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <SplashScreen />
    </Provider>,
  );

  expect(getAllByText('HumorMe').length).toBe(1);
});
