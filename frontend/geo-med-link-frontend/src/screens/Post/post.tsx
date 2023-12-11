import dayjs from "dayjs";
import * as React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Report } from "./report";

export const Post = (value: any) => {
  const [reportModalVisible, setReportModalVisible] = React.useState(false);

  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };
  const data = value.value;
  console.log("this is data");
  console.log(data);
  return (
    <>
      <ScrollView>
        {data.map((post: any) => (
          <Card style={styles.Post} key={post.id}>
            <View style={styles.postTop}>
              <View style={styles.dpName}>
                <Avatar.Image size={40} source={{ uri: "mydp.png" }} />
                <Text style={styles.Name}>{post.user.userName}</Text>
              </View>
              <Pressable onPress={toggleReportModal} style={styles.optionIcon}>
                <Icon name="ellipsis-v" size={18} color="grey" />
              </Pressable>
            </View>
            {post.post !== "" && (
              <Card.Content>
                <Text variant="bodyLarge" style={styles.caption}>
                  {post.post}
                </Text>
              </Card.Content>
            )}
            <Text variant="bodySmall" style={{ marginLeft: 18 }}>
              {dayjs(post.date).format("MMM D, YYYY")}
            </Text>
            <View style={styles.ImageBox}>
              {post.photo !== null && (
                <Card.Cover
                  source={{
                    uri: `data:image/png;base64,${post.photo}`,
                  }}
                  style={{ borderRadius: 0 }}
                />
              )}
            </View>
            <Card.Actions>
              <View style={styles.Interactive}>
                <View style={{ flexDirection: "row" }}>
                  <Iconll name="like2" size={18} style={styles.reactionIcon} />
                  <Text>Like</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="comment-alt"
                    size={18}
                    style={styles.reactionIcon}
                  />
                  <Text>Comment</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="share-square"
                    size={18}
                    style={styles.reactionIcon}
                  />
                  <Text>Share</Text>
                </View>
              </View>
            </Card.Actions>
          </Card>
        ))}
        <Modal visible={reportModalVisible} transparent animationType="slide">
          <Report
            isVisible={reportModalVisible}
            toggleReportModal={toggleReportModal}
          />
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Post: {
    paddingBottom: 5,
    paddingTop: 5,
    height: "auto",
    width: "100%",
    borderRadius: 0,
    borderBottomWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  postTop: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dpName: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    textAlign: "justify",
    height: "auto",
    color: "black",
    marginBottom: 10,
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
    // backgroundColor: 'red',
    justifyContent: "center",
    paddingRight: 15,
    paddingLeft: 15,
  },
  optionIcon: {
    paddingTop: 10,
    // backgroundColor: 'red',
    width: 15,
  },
  reactionIcon: {
    color: "grey",
  },
});
