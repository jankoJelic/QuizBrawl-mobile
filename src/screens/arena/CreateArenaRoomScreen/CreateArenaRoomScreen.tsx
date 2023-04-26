import ScreenWrapper from 'hoc/ScreenWrapper';
import React, { useState } from 'react';
import TileWrapper from 'hoc/TileWrapper';
import { Colors } from 'constants/styles/Colors';
import { FlatList, StyleSheet, View } from 'react-native';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import {
  GeneralIcon,
  GeographyIcon,
  HistoryIcon,
  ArtIcon,
  SportsIcon,
  ShowbizIcon,
} from 'assets/icons/topics';
import useStyles from 'hooks/styles/useStyles';
import BodyMedium from 'components/typography/BodyMedium';
import { Topic } from 'store/types/dataSliceTypes';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import InputField from 'components/inputs/InputField';
import MyScrollView from 'hoc/MyScrollView';
import CTA from 'components/buttons/CTA';
import { isIntegerBewteen } from 'util/strings/isIntegerBetween';
import API from 'services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamsList } from 'navigation/navConstants';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { LOBBY_IDS } from 'constants/constants';
import { useAppSelector } from 'store/index';

const iconSize = AN(36);

const iconStyle = { width: iconSize, aspectRatio: 1 };

export const TOPICS = [
  { name: 'General', icon: <GeneralIcon style={iconStyle} /> },
  { name: 'Geography', icon: <GeographyIcon style={iconStyle} /> },
  { name: 'History', icon: <HistoryIcon style={iconStyle} /> },
  { name: 'Showbiz', icon: <ShowbizIcon style={iconStyle} /> },
  { name: 'Sports', icon: <SportsIcon style={iconStyle} /> },
  { name: 'Art', icon: <ArtIcon style={iconStyle} /> },
];

const CreateArenaRoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateArenaRoom'>
> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { styles, colors } = useStyles(createStyles);
  const { lobbies } = useAppSelector(state => state.data);

  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('4');
  const [answerTime, setAnswerTime] = useState('15');

  const renderItem = ({ item }: TopicListItem) => {
    const isSelected = item.name === selectedTopic;

    const onPressTopic = () => {
      setselectedTopic(item.name);
    };

    return (
      <View>
        <TileWrapper
          onPress={onPressTopic}
          style={{
            ...styles.topic,
            borderColor: isSelected ? colors.brand400 : colors.tileBackground,
          }}>
          {item.icon}
        </TileWrapper>
        <BodyMedium
          onPress={onPressTopic}
          text={item.name}
          color={isSelected ? 'brand500' : undefined}
          style={styles.tileName}
        />
      </View>
    );
  };

  const onPressConfirm = async () => {
    dispatch(startLoading());
    try {
      const body = {
        name: roomName,
        topic: selectedTopic,
        answerTime: Number(answerTime),
        maxPlayers: Number(maxPlayers),
        lobby: lobbies.find(l => l.id === LOBBY_IDS.ARENA),
      };

      const room = await API.createRoom(body);

      navigation.navigate('ArenaRoom', { room });
    } catch (e) {
      console.log(JSON.stringify(e));
    } finally {
      dispatch(stopLoading());
    }
  };

  const maxPlayersValid = isIntegerBewteen({
    input: maxPlayers,
    min: 2,
    max: 16,
  });
  const answerTimeValid = isIntegerBewteen({
    input: answerTime,
    min: 10,
    max: 20,
  });
  const roomNameValid = roomName.length > 3;
  const formValid = maxPlayersValid && roomNameValid && answerTimeValid;

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <NavHeader title="Create room" />
      <MyScrollView>
        <BodyLarge
          text="Select topic"
          style={{ marginLeft: PADDING_HORIZONTAL, marginTop: AN(20) }}
        />
        <FlatList
          horizontal
          data={TOPICS}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
        />
        <View style={{ paddingHorizontal: PADDING_HORIZONTAL }}>
          <InputField title="Room name" onChangeText={setRoomName} />
          <InputField
            title="Number of players (2-16)"
            keyboardType="numeric"
            value={maxPlayers}
            onChangeText={setMaxPlayers}
          />
          <InputField
            title="Answer time (10-20 seconds)"
            keyboardType="numeric"
            value={answerTime}
            onChangeText={setAnswerTime}
          />
          <CTA title="Confirm" onPress={onPressConfirm} disabled={!formValid} />
        </View>
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    listContainer: {
      height: AN(54),
    },
    list: {
      marginVertical: AN(20),
      maxHeight: AN(100),
    },
    topic: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: AN(7),
      aspectRatio: 1,
      width: iconSize * 2,
      borderWidth: 1,
    },
    tileName: { textAlign: 'center', marginTop: AN(6) },
  });
export default CreateArenaRoomScreen;

interface TopicListItem {
  item: { name: Topic; icon: JSX.Element };
}
