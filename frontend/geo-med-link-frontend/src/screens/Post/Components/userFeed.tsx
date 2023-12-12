import { FlatList } from "react-native";
import { Loader } from "../../../helper/loader";
import { useFetchUserPost } from "../../../hooks/post/usePostApi";
import { Post } from "../post";

export const UserFeed = () => {
  const { data: response, isLoading } = useFetchUserPost();
  const data = response?.data;
  console.log("this is data");
  console.log(data);
  console.log(isLoading);
  if (isLoading) {
    <Loader />;
  }
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <Post value={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <Loader />}
      />
    </>
  );
};
