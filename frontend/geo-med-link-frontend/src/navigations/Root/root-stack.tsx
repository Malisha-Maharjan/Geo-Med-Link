import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "~/context/userContext";
import { LoginScreen } from "~/screens/Login/login";
// import { Comment } from "~/screens/Post/Comment/comment";
import { Search } from "~/screens/Search/search";
import { EditProfile } from "~/screens/User/EditProfile";
import { ChangePassword } from "~/screens/User/changePassword";
import { Profile } from "~/screens/User/profile";
import { BottomTabNavigator } from "../Bottom/bottom-stack";
import { RootStackParamList } from "./root-stack.types";

const RootStack = createStackNavigator<RootStackParamList>();

const { Navigator, Screen } = RootStack;

export const RootStackNavigator = () => {
  const { token } = useUserContext();
  return (
    <Navigator>
      {!token ? (
        <Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          {/* <Screen name="Comment" component={Comment} /> */}
          <Screen name="ChangePassword" component={ChangePassword} />
          <Screen name="EditProfile" component={EditProfile} />
          <Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Navigator>
  );
};
