export type MainStackParamsList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  SetupPinCode: { email: string; password: string };
  EnterPinCode: { pin: string } | undefined;

  Landing: undefined;
  Profile: undefined;

  ArenaLobby: undefined;
  '1v1Lobby': undefined;
  SoloLobby: undefined;

  CreateQuiz: undefined;
};
