export const setColorOpacity = (hex: string, opacity = 0.8) =>
  `${hex}${Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
