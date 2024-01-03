import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { Loader } from "~/helper/loader";
import { useFetchComment } from "~/hooks/post/useCommentApi";
import { ViewComment } from "./Components/viewComment";

type CommentProps = {
  isVisible: boolean;
  toggleComment: () => void;
  postId: number;
};
export const Comment = ({ isVisible, toggleComment, postId }: CommentProps) => {
  const [comment, setComment] = useState("");
  const commentBottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const onPostComment = () => {
    setComment("");
  };
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={20}>
        <View style={styles.CommentBox}>
          <View style={styles.comment}>
            <Avatar.Image size={30} source={require("../mydp.png")} />
            <TextInput
              style={styles.commentSection}
              placeholder="Comment"
              multiline={true}
              value={comment}
              onChangeText={(comment) => setComment(comment)}
            />
          </View>
          <View style={styles.CommentAction}>
            <Button onPress={onPostComment} mode="contained-tonal">
              <Text style={{ fontWeight: "bold" }}>Comment</Text>
            </Button>
          </View>
        </View>
      </BottomSheetFooter>
    ),
    []
  );
  const handler = useCallback(
    (props: any) => (
      <BottomSheetHandle {...props} bottomInset={20}>
        <Text
          variant="headlineSmall"
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Comment
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
        footerComponent={renderFooter}
        handleComponent={handler}
        handleStyle={{ backgroundColor: "red" }}
        style={{ backgroundColor: "red" }}
      >
        <BottomSheetFlatList
          data={data}
          renderItem={({ item }) => <ViewComment value={item} />}
          ItemSeparatorComponent={() => <Divider bold />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>Empty Comment</Text>}
          style={{ backgroundColor: "red" }}
        />
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  CommentBox: {
    // backgroundColor: "white",
    paddingLeft: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentSection: {
    // backgroundColor: "transparent",
    width: "85%",
    fontSize: 14,
  },
  CommentAction: {
    alignItems: "center",
    paddingTop: 5,
    margin: 10,
  },
});
