import { Dimensions, Platform, PixelRatio, NativeModules } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const PADDING_HORIZONTAL = SCREEN_WIDTH * 0.04;
export const BORDER_RADIUS = 10;
export const HIT_SLOP = (radius: number) => {
  return { top: radius, bottom: radius, left: radius, right: radius };
};

const { PlatformConstants } = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;
const getScale = deviceType === 'pad' ? 650 : 390;
const scale = SCREEN_WIDTH / getScale;

// AN is short from actuatedNormalize, the original name of the function
export function AN(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const FONTS = {
  regular: 'Manrope-Regular',
  bold: 'Manrope-Bold',
  medium: 'Manrope-Medium',
  light: 'Manrope-Light',
  extraLight: 'Manrope-ExtraLight',
  extraBold: 'Manrope-ExtraBold',
  semiBold: 'Manrope-SemiBold',
};

export const FONT_SIZES ={
  
}
