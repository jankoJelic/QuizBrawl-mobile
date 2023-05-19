import { useAppSelector } from 'store/index';

export const useUserData = () => {
  const { inbox } = useAppSelector(state => state.data.userData);

  const unreadMessages = inbox?.filter(m => m.read === 'false');

  return { unreadMessages };
};
