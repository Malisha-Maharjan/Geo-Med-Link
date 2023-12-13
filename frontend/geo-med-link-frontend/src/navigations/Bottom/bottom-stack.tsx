import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { News } from "../../screens/News/news";
import { NewsFeedStackNavigator } from "../Stack/NewsFeed/newsFeed-stack";
import { ProfileStackNavigator } from "../Stack/Profile/profile-stack";
import { BottomTabParamsList } from "./bottom-stack.types";

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const { Screen, Navigator } = Tab;

export const BottomTabNavigator = () => {
  return (
    <>
      <Navigator>
        <Screen
          name="Feed"
          component={NewsFeedStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="post" size={24} color="black" />
            ),
            title: "Post",
          }}
        ></Screen>
        <Screen
          name="News"
          component={News}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="newspaper-o" size={24} color="black" />
            ),
            title: "News",
          }}
        ></Screen>
        <Screen
          name="ProfileStack"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
            title: "Profile",
            headerShown: false,
          }}
        ></Screen>
      </Navigator>
    </>
  );
};
