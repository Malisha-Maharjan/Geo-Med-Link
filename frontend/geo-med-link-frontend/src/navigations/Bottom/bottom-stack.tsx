import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { News } from "../../screens/News/news";
import { NewsFeed } from "../../screens/Post/Components/newsFeed";
import { Profile } from "../../screens/profile";
import { BottomTabParamsList } from "./bottom-stack.types";

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const { Screen, Navigator } = Tab;

export const BottomTabNavigator = () => {
  return (
    <>
      <Navigator>
        <Screen
          name="Post"
          component={NewsFeed}
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
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
            title: "Profile",
          }}
        ></Screen>
      </Navigator>
    </>
  );
};
