// @ts-nocheck
import React from "react";
import { ViewStyle } from "react-native";
import { Image } from 'expo-image';
import { Topic } from "store/types/dataSliceTypes";

export const ArtIcon = (props: ViewStyle) => (
  <Image source={require("./art.png")} {...props} />
);
export const GeneralIcon = (props: ViewStyle) => (
  <Image source={require("./general.png")} {...props} />
);
export const GeographyIcon = (props: ViewStyle) => (
  <Image source={require("./geography.png")} {...props} />
);
export const SportsIcon = (props: ViewStyle) => (
  <Image source={require("./sports.png")} {...props} />
);
export const HistoryIcon = (props: ViewStyle) => (
  <Image source={require("./history.png")} {...props} />
);
export const ShowbizIcon = (props: ViewStyle) => (
  <Image source={require("./showbiz.png")} {...props} />
);
export const MusicIcon = (props: ViewStyle) => (
  <Image source={require("./music.png")} {...props} />
);
export const ScienceIcon = (props: ViewStyle) => (
  <Image source={require("./science.png")} {...props} />
);
export const NewsIcon = (props: ViewStyle) => (
  <Image source={require("./news.png")} {...props} />
);

export const TopicIcon = (props: { topic: Topic } & { style: ViewStyle }) => {
  switch (props.topic) {
    case "General":
      return <GeneralIcon {...props} />;
    case "Sports":
      return <SportsIcon {...props} />;
    case "Music":
      return <MusicIcon {...props} />;
    case "Art":
      return <ArtIcon {...props} />;
    case "History":
      return <HistoryIcon {...props} />;
    case "Geography":
      return <GeographyIcon {...props} />;
    case "Science":
      return <ScienceIcon {...props} />;
    case "Showbiz":
      return <ShowbizIcon {...props} />;
    default:
      return <></>;
  }
};
