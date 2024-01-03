import React, { ReactElement } from "react";
import { FlatList, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Loader } from "~/helper/loader";
import { useFetchComment } from "~/hooks/post/useCommentApi";
import { ViewComment } from "./viewComment";

export type commentSectionProps = {
  postId: number;
  header: ReactElement;
};

export const CommentSection = ({ postId, header }: commentSectionProps) => {
  console.log(postId);
  const {
    data: response,
    isLoading: isLoading,
    isStale,
    refetch,
    isFetching,
    fetchNextPage,
  } = useFetchComment(postId);
  const data = response?.pages.flatMap((item: any) => item.data.data);
  if (isLoading) {
    return <Loader />;
  }
  console.log({ data: data });
  if (!data || data.length === 0)
    return (
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <Text>No Comment</Text>
      </View>
    );

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FAF7F0" }}
      data={data}
      renderItem={({ item }) => <ViewComment value={item} />}
      ListHeaderComponent={header}
      ItemSeparatorComponent={() => <Divider bold />}
      keyExtractor={(item) => item.id}
      // refreshing={!isStale}
      // onRefresh={() => {
      //   refetch();
      // }}
      // onEndReached={() => {
      //   if (!isFetching) {
      //     // if (!hasNextPage) return <Text>No data available</Text>;
      //     fetchNextPage();
      //   }
      // }}
      // onEndReachedThreshold={0}
    />
  );
};
