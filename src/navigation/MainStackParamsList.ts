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
  Profile: Partial<UserData>;
  Friends: undefined;
  Market: undefined;

  Lobby: { lobbyId: number };
  CashGameLobby: undefined;
  SoloLobby: undefined;

  CreateQuiz: undefined;
  CreateRoom: { lobbyId: number };
  Room: { room: Room };

  GameSplash: undefined;
  Question: undefined;
  Results: undefined;
};
