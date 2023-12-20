import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { Loader } from "~/helper/loader";
import { useFetchComment, usePostComment } from "~/hooks/post/useCommentApi";
import { useFetchPostById } from "~/hooks/post/usePostApi";
import { CommentProps } from "~/navigations/Root/root-stack.types";
import { Post } from "../post";

export const Comment = ({ route, navigation }: CommentProps) => {
  const [comment, setComment] = useState("");
  const { postId } = route.params;
  const { data: response, isLoading } = useFetchPostById(postId);
  const { mutate: postComment } = usePostComment();
  const { data: commentResponse, isLoading: isCommentLoading } =
    useFetchComment(postId);
  const data = commentResponse?.pages.flatMap((item: any) => item.data.data);
  console.log({ commentdata: data });
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };
  const onPostComment = () => {
    postComment({ comment, postId });
    setComment("");
  };

  // State to hold the comment

  if (isLoading && isCommentLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (!response.data)
    return (
      <>
        <Text>No data</Text>
      </>
    );
  if (!data || data.length === 0) return <Text>No Data</Text>;
  return (
    <>
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Post value={response.data} />

        <View style={styles.CommentBox}>
          <View style={styles.cmnt}>
            <Avatar.Image size={30} source={require("../../mydp.png")} />
            <TextInput
              style={styles.ipComment}
              placeholder="Leave you comment here"
              multiline={true}
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
          <View style={styles.CommentAction}>
            <Pressable onPress={onPostComment} style={styles.PostCmnt}>
              <Text style={{ fontWeight: "bold" }}>Comment</Text>
            </Pressable>
          </View>
        </View>

        {/*-----Static comment that is already made */}
        <View style={styles.CommentBox}>
          <View style={styles.cmnt}>
            <Avatar.Image size={30} source={require("../../mydp.png")} />
            <Text style={styles.ipComment}>{data[0].comment}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  PostContainer: {
    width: "100%",
    backgroundColor: "#B2BEB5",
    padding: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  Post: {
    // padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    height: "auto",
    width: "100%",
    // backgroundColor: '#d9d9d9',
    // backgroundColor: 'red',
    borderRadius: 0,
    borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    backgroundColor: "#F8F6F4",
    justifyContent: "center",
    // marginTop: 5,
    // marginBottom: 5,
  },
  postTop: {
    height: 40,
    marginBottom: 10,
    // backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dpName: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'red',
    // borderBottomLeftRadius: 20,
    // borderTopLeftRadius: 20,
  },
  caption: {
    // width: 100,
    // backgroundColor: 'red',
    textAlign: "justify",
    height: "auto",
    color: "black",
    // marginTop: 3,
    marginBottom: 8,
  },
  Name: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 10,
    // backgroundColor: 'red',
    height: 30,
    width: "auto",
  },
  Interactive: {
    width: "100%",
    paddingRight: 30,
    paddingLeft: 30,
    // backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  ImageBox: {
    width: "100%",
    justifyContent: "center",
    paddingRight: 15,
    paddingLeft: 15,
  },
  optionIcon: {
    paddingTop: 10,
    // backgroundColor: 'red',
    width: 40,
    alignItems: "center",
  },
  reactionIcon: {
    color: "grey",
  },
  CommentBox: {
    minHeight: 100,
    backgroundColor: "white",
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
  },
  cmnt: {
    // backgroundColor: "aqua",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ipComment: {
    backgroundColor: "transparent",
    width: "85%",
    fontSize: 14,
  },
  CommentAction: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 5,

    // backgroundColor: 'red'
  },
  PostCmnt: {
    // backgroundColor: "aqua",
    width: "auto",
  },
});
