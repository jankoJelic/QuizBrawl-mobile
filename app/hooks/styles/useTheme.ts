import { useAppSelector } from 'store';

const useTheme = () => {
  const { theme, colors } = useAppSelector(state => state.appState);

  return { theme, colors };
};

export default useTheme;
