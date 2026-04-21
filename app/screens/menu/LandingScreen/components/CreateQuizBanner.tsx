import Banner from 'containers/Banner/Banner';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React from 'react';

const CreateQuizBanner = () => {
  const navigation = useMyNavigation();

  const goToCreateQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  return (
    <Banner
      onPress={goToCreateQuiz}
      title="Create your quiz"
      text="Make cool trivia checks by yourself or with friends"
      icon="mushroom"
    />
  );
};

export default CreateQuizBanner;
