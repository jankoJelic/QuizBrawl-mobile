import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import LeagueTile from 'components/tiles/LeagueTile/LeagueTile';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { League } from 'services/api/endpoints/leaguesAPI';
import { useAppSelector } from 'store/index';

const LeaguesScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Leagues'>
> = ({ navigation }) => {
  const { styles, colors, commonStyles } = useStyles(createStyles);

  const { leagues } = useAppSelector(state => state.leagues);

  const onPressCreateLeague = () => {
    navigation.navigate('CreateLeague');
  };

  const renderItem = ({ item }: { item: League }) => (
    <LeagueTile league={item} />
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
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LeaguesScreen;
