import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'navigation/MainStackParamsList';

export const useMyNavigation = () => {
  const navigation: NavigationProp<MainStackParamsList> = useNavigation();
  return navigation;
};
