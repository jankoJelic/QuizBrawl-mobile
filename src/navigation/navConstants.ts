export const ROUTES = {
  Splash: 'Splash',
  Register: 'Register',
  Login: 'Login',
  EnterPinCode: 'EnterPinCode',
};

export type MainStackParamsList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  SetupPinCode: undefined;
  EnterPinCode: { pin: string } | undefined;

  Landing: undefined;
  Profile: undefined;
};
