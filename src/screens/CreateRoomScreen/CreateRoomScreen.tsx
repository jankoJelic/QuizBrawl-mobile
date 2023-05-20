import ScreenWrapper from 'hoc/ScreenWrapper';
import React, { useState } from 'react';
import { Colors } from 'constants/styles/Colors';
import { StyleSheet, View } from 'react-native';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import {
  GeneralIcon,
  GeographyIcon,
  HistoryIcon,
  ArtIcon,
  SportsIcon,
  ShowbizIcon,
  MusicIcon,
} from 'assets/icons/topics';
import useStyles from 'hooks/styles/useStyles';
import { Lobby, Topic } from 'store/types/dataSliceTypes';
import NavHeader from 'components/layout/NavHeader';
import InputField from 'components/inputs/InputField';
import MyScrollView from 'hoc/MyScrollView';
import CTA from 'components/buttons/CTA';
import { isIntegerBewteen } from 'util/strings/isIntegerBetween';
import API from 'services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { LOBBY_IDS } from 'constants/constants';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { addNewRoom, joinRoom } from 'store/slices/dataSlice';
import TopicsList from 'containers/TopicsList/TopicsList';
import { useAppSelector } from 'store/index';

const iconSize = AN(36);

const iconStyle = { width: iconSize, aspectRatio: 1 };

export const TOPICS = [
  { name: 'General', icon: <GeneralIcon style={iconStyle} /> },
  { name: 'Geography', icon: <GeographyIcon style={iconStyle} /> },
  { name: 'History', icon: <HistoryIcon style={iconStyle} /> },
  { name: 'Showbiz', icon: <ShowbizIcon style={iconStyle} /> },
  { name: 'Music', icon: <MusicIcon style={iconStyle} /> },
  { name: 'Sports', icon: <SportsIcon style={iconStyle} /> },
  { name: 'Art', icon: <ArtIcon style={iconStyle} /> },
];

const CreateRoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateRoom'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { lobbyId } = route.params;

  const { styles, colors } = useStyles(createStyles);
  const { lobbies, userData } = useAppSelector(state => state.data);

  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [roomName, setRoomName] = useState(`${userData.firstName}'s room`);
  const [bet, setBet] = useState('0');
  const [password, setPassword] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(__DEV__ ? '2' : '4');
  const [answerTime, setAnswerTime] = useState('15');
  const [questionsCount, setQuestionsCount] = useState(__DEV__ ? '2' : '15');

  const onPressConfirm = async () => {
    dispatch(startLoading());
    try {
      const body = {
        name: roomName,
        topic: selectedTopic,
        answerTime: Number(answerTime),
        maxPlayers: Number(maxPlayers),
        lobby: lobbies.find(l => l.id === lobbyId) as Lobby,
        questionsCount: Number(questionsCount),
        readyUsers: [userData.id],
        password,
        bet,
      };

      const room = await API.createRoom(body);

      dispatch(addNewRoom(room));
      dispatch(joinRoom(room));

      SOCKET.emit(SOCKET_EVENTS.ROOM_CREATED, room);

      navigation.navigate('Room', { room });
    } catch (e) {
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
  const questionsCountValid = isIntegerBewteen({
    input: questionsCount,
    min: __DEV__ ? 2 : 10,
    max: 20,
  });
  const roomNameValid = roomName.length > 3;
  const betValid = Number(bet) <= userData.money;

  const formValid =
    maxPlayersValid && roomNameValid && answerTimeValid && questionsCountValid;

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <NavHeader title="Create room" />
      <MyScrollView>
        <TopicsList
          onSelectTopic={setselectedTopic}
          selectedTopic={selectedTopic}
        />
        <View style={{ paddingHorizontal: PADDING_HORIZONTAL }}>
          <InputField
            title="Room name"
            onChangeText={setRoomName}
            value={roomName}
            error={!roomNameValid}
          />
          {lobbyId === LOBBY_IDS.CASH_GAME ? (
            <InputField
              title={`Bet cash (your balance: ${String(userData.money)})`}
              onChangeText={setBet}
              value={bet}
              error={!betValid}
            />
          ) : (
            <></>
          )}
          <InputField
            title="Number of players (2-16)"
            keyboardType="numeric"
            value={maxPlayers}
            onChangeText={setMaxPlayers}
            error={!maxPlayersValid}
          />
          <InputField
            title="Answer time (10-20 seconds)"
            keyboardType="numeric"
            value={answerTime}
            onChangeText={setAnswerTime}
            error={!answerTimeValid}
          />
          <InputField
            title="Number of questions (10-20)"
            keyboardType="numeric"
            value={questionsCount}
            onChangeText={setQuestionsCount}
            error={!questionsCountValid}
          />
          {lobbyId !== LOBBY_IDS.ARENA ? (
            <InputField
              title="Password"
              onChangeText={setPassword}
              value={password}
            />
          ) : (
            <></>
          )}
          <CTA title="Confirm" onPress={onPressConfirm} disabled={!formValid} />
        </View>
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});
export default CreateRoomScreen;

interface TopicListItem {
  item: { name: Topic; icon: JSX.Element };
}
