import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomTabParamsList = {
  ProfileStack: undefined;
  Feed: undefined;
  Upload: undefined;
  Maps: undefined;
  News: undefined;
};

export type TabNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;
