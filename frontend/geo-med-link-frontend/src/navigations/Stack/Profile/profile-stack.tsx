import { createStackNavigator } from "@react-navigation/stack";
import { EditProfile } from "~/screens/User/EditProfile";
import { ChangePassword } from "~/screens/User/changePassword";
import { Profile } from "~/screens/User/profile";
import { ProfileStackParamList } from "./profile-stack.types";

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const { Navigator, Screen } = ProfileStack;

export const ProfileStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      ></Screen>
      <Screen name="ChangePassword" component={ChangePassword} />
      <Screen name="EditProfile" component={EditProfile} />
    </Navigator>
  );
};
