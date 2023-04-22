import ScreenWrapper from 'hoc/ScreenWrapper';
import React from 'react';
import { useAppSelector } from 'store';

const LandingScreen = () => {
  const { userData } = useAppSelector(state => state.auth);

  console.log(userData);
  return <ScreenWrapper></ScreenWrapper>;
};

export default LandingScreen;
