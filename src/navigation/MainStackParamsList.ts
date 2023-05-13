import { Room } from 'store/types/dataSliceTypes';

export type MainStackParamsList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  SetupPinCode: { email: string; password: string };
  EnterPinCode: { pin: string } | undefined;
  SelectProvider: { flow: 'register' | 'login' };

  Landing: undefined;
  Profile: undefined;

  ArenaLobby: undefined;
  '1v1Lobby': undefined;
  SoloLobby: undefined;

  CreateQuiz: undefined;

  CreateArenaRoom: undefined;
  ArenaRoom: { room: Room };

  GameSplash: undefined;
  Question: undefined;
  Results: undefined;
};
