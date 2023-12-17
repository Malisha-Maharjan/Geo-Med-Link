import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { Loader } from "~/helper/loader";
import { useFetchPostById } from "~/hooks/post/usePostApi";
import { CommentProps } from "~/navigations/Root/root-stack.types";
import { Post } from "../post";

export const Comment = ({ route, navigation }: CommentProps) => {
  const { postId } = route.params;
  console.log({ postId });
  const { data: response, isLoading } = useFetchPostById(postId);
  console.log({ response });

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };

  // State to hold the comment
  const [comment, setComment] = useState("");

  if (isLoading)
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
  return (
    <>
      <ScrollView contentContainerStyle={styles.PostContainer}>
        {/* <Card style={styles.Post}>
          <View style={styles.postTop}>
            <View style={styles.dpName}>
              <Avatar.Image size={40} source={require("../../mydp.png")} />
              <Text style={styles.Name}>Hobart Romain Alex</Text>
            </View>
            <Pressable onPress={toggleReportModal} style={styles.optionIcon}>
              <Iconlll name="report" size={18} color="grey" />
            </Pressable>
          </View>
          <Card.Content>
            <Text variant="titleLarge" style={styles.caption}>
              Lately, it feels like I've been in a never-ending tango with this
              stubborn bug! The constant sniffles, sneezing symphonies, and
              feeling like a marathon runner with a cough have been my daily
              companions. Slowly pacing through each day, holding out hope for
              the day this bug decides to bid adieu! 🤒🌧️{" "}
            </Text>
          </Card.Content>
          <View style={styles.ImageBox}>
            {/* <Card.Cover
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJRDYPQYpItOt9krno_-3JLQ32qQMDfEwUQ&usqp=CAU",
              }}
              style={styles.Image}
            /> */}
        {/* </View>
          <Card.Actions>
            <View style={styles.Interactive}>
              <Iconll name="like2" size={18} style={styles.reactionIcon}>
                <Text style={{ fontSize: 14 }}> Like</Text>
              </Iconll>
              <Icon name="comment-alt" size={18} style={styles.reactionIcon}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  {" "}
                  Comment
                </Text>
              </Icon>
              <Icon name="share-square" size={18} style={styles.reactionIcon}>
                <Text style={{ fontSize: 14 }}> Share</Text>
              </Icon>
            </View>
          </Card.Actions>
        </Card> */}
        <Post value={response.data} />

        <View style={styles.CommentBox}>
          <View style={styles.cmnt}>
            <Avatar.Image size={30} source={require("../../mydp.png")} />
            <TextInput
              style={styles.ipComment}
              placeholder="Leave you comment here"
              multiline={true}

              /*-------------------Uncomment this us use API----------------- */
              // value={comment}
              // onChangeText={text => setComment(text)} // Update the comment state
            />
          </View>
          <View style={styles.CommentAction}>
            <Pressable onPress={() => {}} style={styles.PostCmnt}>
              <Text style={{ fontWeight: "bold" }}>Comment</Text>
            </Pressable>
          </View>
        </View>

        {/*-----Static comment that is already made */}
        <View style={styles.CommentBox}>
          <View style={styles.cmnt}>
            <Avatar.Image size={30} source={require("../../mydp.png")} />
            <Text style={styles.ipComment}>
              This is the comment related to this post
            </Text>
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
