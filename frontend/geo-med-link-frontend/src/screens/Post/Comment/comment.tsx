import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { Loader } from "~/helper/loader";
import { usePostComment } from "~/hooks/post/useCommentApi";
import { useFetchPostById } from "~/hooks/post/usePostApi";
import { CommentProps } from "~/navigations/Root/root-stack.types";
import { Post } from "../post";
import { CommentSection } from "./Components/commentSection";

export const Comment = ({ route }: CommentProps) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { mutate: postComment } = usePostComment();
  const { data: response, isLoading } = useFetchPostById(postId);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };
  const onPostComment = () => {
    postComment({ comment, postId });
    setComment("");
  };
  if (isLoading) return <Loader />;

  return (
    <View style={{ flex: 1 }}>
      <CommentSection postId={postId} header={<Post value={response.data} />} />
      <View style={styles.CommentBox}>
        <View style={styles.comment}>
          <Avatar.Image size={30} source={require("../../mydp.png")} />
          <TextInput
            style={styles.commentSection}
            placeholder="Comment"
            multiline={true}
            value={comment}
            onChangeText={(comment) => setComment(comment)}
          />
        </View>
        <View style={styles.CommentAction}>
          <Pressable onPress={onPostComment}>
            <Text style={{ fontWeight: "bold" }}>Comment</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CommentBox: {
    backgroundColor: "white",
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
    backgroundColor: "transparent",
    width: "85%",
    fontSize: 14,
  },
  CommentAction: {
    alignItems: "center",
    paddingTop: 5,
    margin: 10,
  },
});
