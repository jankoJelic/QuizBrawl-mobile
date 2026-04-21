import Banner from 'containers/Banner/Banner';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React from 'react';

const CreateLeagueBanner = () => {
  const navigation = useMyNavigation();

  const goToCreateLeague = () => {
    navigation.navigate('CreateLeague');
  };

  return (
    <Banner
      onPress={goToCreateLeague}
      title="Create league"
      text="Create a league and invite your friends to join and play custom made quizes"
      icon="league"
    />
  );
};

export default CreateLeagueBanner;
