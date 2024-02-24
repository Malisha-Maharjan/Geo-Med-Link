import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "~/context/userContext";
import { LoginScreen } from "~/screens/Login/login";
// import { Comment } from "~/screens/Post/Comment/comment";
import { AddEvent } from "~/screens/Event/addEvent";
import { Search } from "~/screens/Search/search";
import { ChangePassword } from "~/screens/User/changePassword";
import { EditDoctor } from "~/screens/User/editDoctor";
import { EditDonor } from "~/screens/User/editDonor";
import { EditProfile } from "~/screens/User/editProfiles";
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
          <Screen name="EditDonor" component={EditDonor} />
          <Screen name="EditDoctor" component={EditDoctor} />
          <Screen name="Event" component={AddEvent} />
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
