import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomTabParamsList = {
  ProfileStack: undefined;
  Feed: undefined;
  News: undefined;
};

export type TabNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;
