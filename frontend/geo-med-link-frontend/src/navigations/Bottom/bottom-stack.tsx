import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UploadPost } from "~/screens/Post/uploadPost";
import { News } from "../../screens/News/news";
// import { ProfileStackNavigator } from "../Stack/Profile/profile-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "~/context/userContext";
import { EventList } from "~/screens/Event/eventList";
import { NewsFeed } from "~/screens/Post/Components/newsFeed";
import { Profile } from "~/screens/User/profile";
import { BottomTabParamsList } from "./bottom-stack.types";

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const { Screen, Navigator } = Tab;

export const BottomTabNavigator = () => {
  const { username } = useUserContext();
  return (
    <>
      <Navigator>
        <Screen
          name="Feed"
          component={NewsFeed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="post" size={24} color="black" />
            ),
            title: "Post",
            headerShown: false,
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
          name="EventList"
          component={EventList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event-note" size={24} color="black" />
            ),
            title: "Events",
          }}
        ></Screen>
        <Screen
          name="Upload"
          component={UploadPost}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plussquareo" size={24} color="black" />
            ),
            title: "Upload Post",
            headerShown: false,
          }}
        ></Screen>
        <Screen
          name="ProfileStack"
          component={Profile}
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
