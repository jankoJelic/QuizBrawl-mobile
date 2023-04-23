import React from 'react';
import FastImage from 'react-native-fast-image';

export const ArtIcon = props => (
  <FastImage source={require('./art.png')} {...props} />
);
export const GeneralIcon = props => (
  <FastImage source={require('./general.png')} {...props} />
);
export const GeographyIcon = props => (
  <FastImage source={require('./geography.png')} {...props} />
);
export const SportsIcon = props => (
  <FastImage source={require('./sports.png')} {...props} />
);
export const HistoryIcon = props => (
  <FastImage source={require('./history.png')} {...props} />
);
export const ShowbizIcon = props => (
  <FastImage source={require('./showbiz.png')} {...props} />
);
