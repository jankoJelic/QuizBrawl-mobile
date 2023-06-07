import { League } from 'services/api/endpoints/leaguesAPI';
import { Quiz } from 'store/slices/createQuizSlice';
import { UserData } from 'store/types/authSliceTypes';
import { Room } from 'store/types/dataSliceTypes';

export type MainStackParamsList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  SetupPinCode: { email: string; password: string };
  EnterPinCode: { pin: string } | undefined;
  SelectProvider: { flow: 'register' | 'login' };

  Landing: undefined;
  Inbox: undefined;
  CustomizeProfile: undefined;
  Profile: UserData;
  Friends: undefined;
  Market: undefined;

  Lobby: { lobbyId: number };
  CashGameLobby: undefined;
  SoloLobby: undefined;

  CreateQuiz?: { quiz?: Quiz; leagueId?: number };
  MyQuizes: undefined;
  CreateRoom: { lobbyId: number };
  Room: { room: Room };

  GameSplash: undefined;
  Question: undefined;
  Results: { leagueId?: number };

  Leagues: undefined;
  League: { league: League };
  CreateLeague: undefined;
};
