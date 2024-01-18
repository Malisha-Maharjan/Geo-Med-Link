import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import { useUserContext } from "~/context/userContext";
import { usePostComment } from "~/hooks/post/useCommentApi";

type AddCommentProps = {
  postId: number;
};

export const AddComment = ({ postId }: AddCommentProps) => {
  const { image, username } = useUserContext();
  const [comment, setComment] = useState("");
  const { mutate: postComment } = usePostComment();
  console.log({ username });
  const onPostComment = () => {
    postComment({ comment, postId });
    setComment("");
  };
  return (
    <View style={styles.CommentBox}>
      <View style={styles.comment}>
        <Avatar.Image
          size={30}
          // source={{ uri: `data:image/png;base64,${image}` }}
          source={require("../../../mydp.png")}
        />
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
  );
};

const styles = StyleSheet.create({
  CommentBox: {
    // backgroundColor: 'white',
    backgroundColor: "#176B87",
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
