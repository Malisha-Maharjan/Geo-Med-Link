import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
  Login: undefined;
  BottomTab: undefined;
  Comment: { postId: number };
  ChangePassword: undefined;
  EditProfile: undefined;
};
export type CommentProps = NativeStackScreenProps<
  RootStackParamList,
  "Comment"
>;

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
