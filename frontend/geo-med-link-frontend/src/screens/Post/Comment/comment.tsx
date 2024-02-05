import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { Portal, Text } from "react-native-paper";
import { useUserContext } from "~/context/userContext";
import { Loader } from "~/helper/loader";
import { useFetchComment } from "~/hooks/post/useCommentApi";
import { AddComment } from "./Components/addComment";
import { ViewComment } from "./Components/viewComment";

type CommentProps = {
  isVisible: boolean;
  toggleComment: () => void;
  postId: number;
};
export const Comment = ({ isVisible, toggleComment, postId }: CommentProps) => {
  const commentBottomSheetModalRef = useRef<BottomSheet>(null);
  const { username } = useUserContext();
  console.log("this is comment");
  console.log({ username });
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const handler = useCallback(
    (props: any) => (
      <BottomSheetHandle
        {...props}
        style={{
          backgroundColor: "#232322",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        bottomInset={20}
      >
        <Text
          variant="headlineSmall"
          style={{
            backgroundColor: "#232322",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          Comments
        </Text>
      </BottomSheetHandle>
    ),
    []
  );

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
    return (
      <Portal>
        <Loader />
      </Portal>
    );
  }
  return (
    <Portal>
      <BottomSheet
        ref={commentBottomSheetModalRef}
        snapPoints={snapPoints}
        index={1}
        enablePanDownToClose
        onClose={toggleComment}
        footerComponent={(props) => (
          <BottomSheetFooter {...props} bottomInset={20}>
            <AddComment postId={postId} />
          </BottomSheetFooter>
        )}
        handleComponent={handler}
        handleStyle={{ backgroundColor: "#FAF7F0" }}
        // style={{ backgroundColor: 'blue' }}
      >
        <BottomSheetFlatList
          data={data}
          renderItem={({ item }) => <ViewComment value={item} />}
          // ItemSeparatorComponent={() => <Divider bold />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 40,
                fontSize: 18,
              }}
            >
              No Comments Yet
            </Text>
          }
          refreshing={!isStale}
          onRefresh={refetch}
          onEndReached={() => {
            if (!isFetching) {
              // if (!hasNextPage) return <Text>No data available</Text>;
              fetchNextPage();
            }
          }}
          style={{ backgroundColor: "#232322", marginBottom: 65 }}
        />
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  CommentBox: {
    // backgroundColor: "#176B87",
    paddingLeft: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
    bottom: -20,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'tan',
  },
  commentSection: {
    // backgroundColor: "transparent",
    width: "85%",
    // backgroundColor: 'orange',
    fontSize: 14,
  },
  CommentAction: {
    alignItems: "center",
    paddingTop: 5,
    margin: 10,
    // backgroundColor: 'aqua',
  },
});
