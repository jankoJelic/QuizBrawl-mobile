import { Platform } from "react-native";

export const normalizeImageUri = (uri: string): string => {
  if (Platform.OS === "android") {
    return uri?.replace("localhost", "10.0.2.2");
  }
  return uri;
};
