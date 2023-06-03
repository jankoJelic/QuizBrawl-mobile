import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import LeagueTile from 'components/tiles/LeagueTile/LeagueTile';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import PasswordPopup from 'containers/Popup/PasswordPopup';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { League } from 'services/api/endpoints/leaguesAPI';
import { useAppSelector } from 'store/index';

const LeaguesScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Leagues'>
> = ({ navigation }) => {
  const { styles, colors, commonStyles } = useStyles(createStyles);
  const { leagues } = useAppSelector(state => state.leagues);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League>();

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setPasswordError(false);
  };

  const onPressCreateLeague = () => {
    navigation.navigate('CreateLeague');
  };

  const goToLeague = (league: League) => {
    navigation.navigate('League', { league });
  };

  const onPressLeague = (league: League) => {
    if (league.password) {
      setSelectedLeague(league);
      setPasswordModalVisible(true);
    } else {
      goToLeague(league);
    }
  };

  const onSubmitPassword = (password: string) => {
    if (password === selectedLeague?.password) {
      closePasswordModal();
      goToLeague(selectedLeague);
    } else {
      setPasswordError(true);
    }
  };

  const renderItem = ({ item }: { item: League }) => (
    <LeagueTile league={item} onPress={onPressLeague} />
  );

  return (
    <ScreenWrapper>
      <NavHeader fullWidth title="Leagues" />
      <BodyLarge />
      <FlatList data={leagues} renderItem={renderItem} />
      <CTA
        title="Create new league"
        onPress={onPressCreateLeague}
        style={commonStyles.ctaFooter}
      />
      <PasswordPopup
        visible={passwordModalVisible}
        closeModal={closePasswordModal}
        error={passwordError}
        onSubmit={onSubmitPassword}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LeaguesScreen;
