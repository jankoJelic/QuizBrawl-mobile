import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import LeagueTile from 'components/tiles/LeagueTile/LeagueTile';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { League } from 'services/api/endpoints/leaguesAPI';
import { useAppSelector } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { setLeagues } from 'store/slices/leaguesSlice';

const LeaguesScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Leagues'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles, colors, commonStyles } = useStyles(createStyles);
  const { leagues } = useAppSelector(state => state.leagues);
  const { id } = useAppSelector(state => state.data.userData);

  const [leaguesToDisplay, setLeaguesToDisplay] = useState<League[]>(leagues);
  const [searchInput, setSearchInput] = useState('');

  const myLeagues = leagues.filter(
    l => l.userId === id || l.users?.some(u => u.id === id),
  );

  const onPressCreateLeague = () => {
    navigation.navigate('CreateLeague');
  };

  const goToLeague = (league: League) => {
    navigation.navigate('League', { league });
  };

  const onPressLeague = (league: League) => {
    goToLeague(league);
  };

  const renderItem = ({ item }: { item: League }) => (
    <LeagueTile league={item} onPress={onPressLeague} />
  );

  const getAllLeagues = async () => {
    try {
      dispatch(startLoading());
      const allLeagues = await API.getAllLeagues();

      dispatch(setLeagues(allLeagues));
      setLeaguesToDisplay(allLeagues);
    } catch (error) {
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getAllLeagues();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      setLeaguesToDisplay(leagues);
    } else {
      const filteredLeagues = leagues.filter(l =>
        l.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setLeaguesToDisplay(filteredLeagues);
    }
  }, [searchInput]);

  return (
    <ScreenWrapper>
      <NavHeader fullWidth title="Leagues" />
      <BodyLarge text="My leagues" style={{ marginBottom: AN(10) }} />

      <FlatList
        data={myLeagues}
        renderItem={renderItem}
        keyExtractor={item => item.id + '_myLeague'}
        style={{ maxHeight: (myLeagues?.length || 0) * 80 }}
        contentContainerStyle={{ maxHeight: (myLeagues?.length || 0) * 80 }}
      />
      <BodyLarge text="All leagues" style={{ top: AN(20) }} />
      <InputField
        placeholder="Search..."
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <FlatList
        data={leaguesToDisplay}
        renderItem={renderItem}
        keyExtractor={item => item.id + '_allLeagues'}
      />
      <CTA
        title="Create new league"
        onPress={onPressCreateLeague}
        style={commonStyles.ctaFooter}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LeaguesScreen;
