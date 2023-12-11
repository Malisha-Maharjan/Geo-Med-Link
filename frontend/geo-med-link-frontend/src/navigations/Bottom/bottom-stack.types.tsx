import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type BottomTabParamsList = {
  Profile: undefined;
  Post: undefined;
  News: undefined;
};

export type TabNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;
