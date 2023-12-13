import { createStackNavigator } from "@react-navigation/stack";
import { Comment } from "~/screens/Post/Components/comment";
import { Post } from "~/screens/Post/post";
import { PostStackParamsList } from "./post-stack.types";

const PostNavigator = createStackNavigator<PostStackParamsList>();
const { Navigator, Screen } = PostNavigator;

export const PostStackNavigator = () => {
  return (
    <Navigator>
      <Screen name="Post" component={Post} />
      <Screen name="Comment" component={Comment} />
    </Navigator>
  );
};
