import dayjs from "dayjs";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export const ViewComment = (value: any) => {
  const data = value.value;

  console.log("Data testing", data);

  return (
    <View style={styles.comment}>
      <Avatar.Image
        size={30}
        source={{ uri: `data:image/png;base64,${data.user.photo}` }}
        style={styles.avatarStyle}
      />
      <View style={styles.viewCommentContent}>
        <View>
          <Text style={styles.userName}>{data.user.userName}</Text>
        </View>
        <View style={styles.commentAndLikeWrapper}>
          <View style={styles.actualCommentBox}>
            <Text style={styles.actualCommentBoxText}>{data.comment}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginTop: 8,
            }}
          >
            <Text>{dayjs(data.date).format("MMM D, YYYY")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    padding: 4,
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#B4D4FF",
    gap: 10,
  },
  avatarStyle: {
    top: 4,
  },
  viewCommentContent: {
    width: "85%",
  },
  userName: {
    fontSize: 18,
  },
  commentAndLikeWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  actualCommentBox: {
    width: "100%",
    backgroundColor: "#EEF5FF",
    padding: 5,
    borderRadius: 10,
    marginTop: 8,
  },
  actualCommentBoxText: {
    textAlign: "justify",
  },
  likeWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
