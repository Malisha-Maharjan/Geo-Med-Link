import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useFetchPost } from "../../../hooks/post/usePostApi";
import { Post } from "../post";

export const NewsFeed = () => {
  const { data: response, isLoading } = useFetchPost();
  const data = response?.data;
  console.log("this is data");
  console.log(data);
  console.log(isLoading);
  if (isLoading)
    return (
      <View>
        <ActivityIndicator animating={true} color={MD2Colors.blue200} />
      </View>
    );
  return (
    <>
      <Post value={data} />
    </>
  );
};
