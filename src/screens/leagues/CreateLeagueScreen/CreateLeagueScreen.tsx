import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DoubleRingSpinner from 'assets/spinners/DoubleRingSpinner';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import CheckboxTile from 'components/tiles/CheckboxTile';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { LeagueType } from 'services/api/endpoints/leaguesAPI';
import { store, useAppSelector } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { setLeagueImages, setLeagues } from 'store/slices/leaguesSlice';

const CreateLeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateLeague'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);

  const { firstName } = useAppSelector(state => state.data.userData);
  const { leagueImages } = useAppSelector(state => state.leagues);

  const [title, setTitle] = useState(`${firstName}'s league`);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [bet, setBet] = useState('0');
  const [type, setType] = useState<LeagueType>('ROUND');

  const getLeagueImages = async () => {
    if (leagueImages.length) return;
    const images = await API.getLeagueImages();
    dispatch(setLeagueImages(images));
  };

  const renderImage = ({ item }: { item: string }) => {
    const onPressImage = () => {
      setImage(item);
    };

    const isSelected = image === item;

    return (
      <TouchableBounce
        onPress={onPressImage}
        style={{
          ...styles.leagueImageContainer,
          borderColor: isSelected ? colors.brand500 : colors.neutral500,
        }}>
        <FastImage style={styles.leagueImage} source={{ uri: item }} />
      </TouchableBounce>
    );
  };

  useEffect(() => {
    getLeagueImages();
  }, []);

  const onPressSubmit = async () => {
    dispatch(startLoading());
    try {
      const league = await API.createLeague({
        bet: Number(bet),
        image,
        name: title,
        password,
        type,
      });

      dispatch(setLeagues(store.getState().leagues.leagues.concat([league])));
      navigation.navigate('Leagues');
    } catch (error) {
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Create league" fullWidth />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: AN(80) }}>
        <InputField title="Name" onChangeText={setTitle} value={title} />

        <BodyLarge text="Image" style={styles.subtitle} />
        {leagueImages.length ? (
          <View>
            <FlatList
              data={leagueImages}
              renderItem={renderImage}
              horizontal
              keyExtractor={item => item + '_leagueImage'}
              style={{ alignSelf: 'flex-start' }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'flex-start', padding: 0 }}
            />
          </View>
        ) : (
          <DoubleRingSpinner style={{ width: AN(50), aspectRatio: 1 }} />
        )}
        <InputField
          title="Password"
          value={password}
          onChangeText={setPassword}
        />

        <InputField title="Buy in" value={bet} onChangeText={setBet} />
        <BodyLarge text="Type" style={styles.subtitle} />
        <CheckboxTile
          onPress={() => {
            setType('ADMIN');
          }}
          value={type === 'ADMIN'}
          text="ADMIN - Only admin can add quizzes to league, and will not participate"
        />
        <CheckboxTile
          onPress={() => {
            setType('ROUND');
          }}
          value={type === 'ROUND'}
          text="ROUND - All users can contribute with quizzes, and participate in all game except the ones they created"
        />
      </ScrollView>
      <CTA
        title="Submit"
        disabled={!title || !image}
        style={styles.cta}
        onPress={onPressSubmit}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    leagueImageContainer: {
      padding: AN(10),
      borderRadius: BORDER_RADIUS,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: AN(10),
    },
    leagueImage: { height: AN(40), aspectRatio: 1 },
    cta: { position: 'absolute', bottom: AN(10), alignSelf: 'center' },
    subtitle: { marginBottom: AN(10), marginLeft: AN(5), marginTop: AN(6) },
  });

export default CreateLeagueScreen;
