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
  EnterPinCode: { pin: string } | undefined;
};
