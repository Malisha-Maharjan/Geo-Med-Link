import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "~/context/userContext";
import { LoginScreen } from "~/screens/Login/login";
import { Comment } from "~/screens/Post/Components/comment";
import { EditProfile } from "~/screens/User/EditProfile";
import { ChangePassword } from "~/screens/User/changePassword";
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
          <Screen name="Comment" component={Comment} />
          <Screen name="ChangePassword" component={ChangePassword} />
          <Screen name="EditProfile" component={EditProfile} />
        </>
      )}
    </Navigator>
  );
};
