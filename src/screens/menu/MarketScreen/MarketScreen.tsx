import NavHeader from 'components/layout/NavHeader';
import BodyMedium from 'components/typography/BodyMedium';
import ScreenWrapper from 'hoc/ScreenWrapper';
import React from 'react';

const MarketScreen = () => {
  
  return (
    <ScreenWrapper>
      <NavHeader title="Market" />
      <BodyMedium text='Avatars' />
    </ScreenWrapper>
  );
};

export default MarketScreen;
