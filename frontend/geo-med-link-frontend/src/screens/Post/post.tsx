import dayjs from "dayjs";
import * as React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "~/components";
import { Report } from "./report";

export const Post = (value: any) => {
  const [reportModalVisible, setReportModalVisible] = React.useState(false);

  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };
  // console.log({ value });
  const data = value.value;
  // console.log("this is data");
  // console.log(data);
  return (
    <>
      <Card mode="contained" style={styles.post}>
        <View style={styles.postTop}>
          <View style={styles.dpName}>
            <Avatar.Image size={40} source={require("../mydp.png")} />
            <Text style={styles.Name}>{data.user.userName}</Text>
            {__DEV__ && <Text>ID: {data.id}</Text>}
          </View>
          <Pressable onPress={toggleReportModal} style={styles.optionIcon}>
            <Icon name="ellipsis-v" size={18} color="grey" />
          </Pressable>
        </View>
        {data.post !== "" && (
          <Card.Content>
            <Text variant="bodyLarge" style={styles.caption}>
              {data.post}
            </Text>
          </Card.Content>
        )}
        <Text variant="bodySmall" style={{ marginLeft: 18 }}>
          {dayjs(data.date).format("MMM D, YYYY")}
        </Text>
        <View style={styles.ImageBox}>
          {data.photo !== null && (
            <Card.Cover
              source={{
                uri: `data:image/png;base64,${data.photo}`,
              }}
              style={{ borderRadius: 0 }}
            />
          )}
        </View>

        <View style={styles.Interactive}>
          <Row>
            <Iconll name="like2" size={18} style={styles.reactionIcon} />
            <Text>Like</Text>
          </Row>
          <Row>
            <Icon name="comment-alt" size={18} style={styles.reactionIcon} />
            <Text>Comment</Text>
          </Row>
          <Row>
            <Icon name="share-square" size={18} style={styles.reactionIcon} />
            <Text>Share</Text>
          </Row>
        </View>
      </Card>

      <Modal visible={reportModalVisible} transparent animationType="slide">
        <Report
          isVisible={reportModalVisible}
          toggleReportModal={toggleReportModal}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    padding: 10,
  },
  postTop: {
    height: 40,
    margin: 10,
    // padding: 10,
    paddingBottom: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dpName: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    paddingBottom: 10,
  },
  Name: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
    // backgroundColor: 'red',
    height: 30,
  },
  Interactive: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
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
