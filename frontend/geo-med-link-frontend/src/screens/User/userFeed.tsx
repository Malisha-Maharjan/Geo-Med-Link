import { useState } from "react";
import { FlatList } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useFetchUserPost } from "~/hooks/post/usePostApi";
import { UserDetail } from "~/screens/User/userDetail";
import { Loader } from "../../helper/loader";
import { Post } from "../Post/post";

export const UserFeed = (userData: any) => {
  const user = userData.userData;
  console.log({ userFeedUser: user });
  const [value, setValue] = useState({});
  const {
    data: response,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isStale,
    refetch,
  } = useFetchUserPost(user.user.userName);
  console.log(response?.pageParams);
  const data = response?.pages.flatMap((item) => item.data.data);
  console.log(hasNextPage);
  if (isLoading) return <Loader />;
  console.log({ isStale });
  if (!data || data.length === 0) return <Text>No Data</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Post value={item} />}
      ItemSeparatorComponent={() => <Divider bold />}
      ListHeaderComponent={() => <UserDetail userData={userData} />}
      ListEmptyComponent={() => <Text>No Data</Text>}
      keyExtractor={(item) => item.id}
      ListFooterComponent={() => <Loader />}
      refreshing={!isStale}
      onRefresh={refetch}
      onEndReached={() => {
        if (!isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
};
