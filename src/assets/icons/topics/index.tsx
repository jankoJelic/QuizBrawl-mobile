import React from 'react';
import FastImage from 'react-native-fast-image';
import { Topic } from 'store/types/dataSliceTypes';

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
export const MusicIcon = props => (
  <FastImage source={require('./music.png')} {...props} />
);
export const ScienceIcon = props => (
  <FastImage source={require('./science.png')} {...props} />
);

export const TopicIcon = props => {
  switch (props.topic) {
    case 'General':
      return <GeneralIcon {...props} />;
    case 'Sports':
      return <SportsIcon {...props} />;
    case 'Music':
      return <MusicIcon {...props} />;
    case 'Art':
      return <ArtIcon {...props} />;
    case 'History':
      return <HistoryIcon {...props} />;
    case 'Geography':
      return <GeographyIcon {...props} />;
    case 'Science':
      return <ScienceIcon {...props} />;
    case 'Showbiz':
      return <ShowbizIcon {...props} />;
    default:
      return <></>;
  }
};
