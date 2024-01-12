import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "~/components";
import { useUserContext } from "~/context/userContext";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";
import { Comment } from "./Comment/comment";
import { Report } from "./report";

export const Post = (value: any) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { username: currentUsername } = useUserContext();

  const toggleIsDialogVisible = () => {
    setIsDialogVisible(!isDialogVisible);
  };
  const data = value.value;

  const toggleComment = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Card style={styles.Post}>
          <View style={styles.postTop}>
            <Pressable
              style={styles.postUser}
              onPress={() =>
                navigation.navigate("Profile", { username: data.user.userName })
              }
            >
              <Avatar.Image size={40} source={require("../mydp.png")} />
              <Text style={styles.userName}>{data.user.userName}</Text>
            </Pressable>
            <IconButton
              icon={() => (
                <Entypo name="dots-three-vertical" size={24} color="black" />
              )}
              onPress={() => bottomSheetModalRef.current?.present()}
              style={styles.reportIcon}
            />
          </View>
          <Card.Content>
            {data.post !== "" && (
              <Text variant="bodyLarge" style={styles.caption}>
                {data.post}
              </Text>
            )}
            <Text variant="bodySmall">
              {dayjs(data.date).format("MMM D, YYYY")}
            </Text>
          </Card.Content>

          <View style={styles.ImageBox}>
            {data.photo !== null && data.photo !== "" && (
              <Card.Cover
                source={{
                  uri: `data:image/png;base64,${data.photo}`,
                }}
                style={{ borderRadius: 0 }}
              />
            )}
          </View>

          <View style={styles.Interactive}>
            <Button
              icon={() => (
                <Iconll name="like2" size={18} style={styles.reactionIcon} />
              )}
              onPress={() => {}}
            >
              Like
            </Button>
            <Button
              icon={() => (
                <Icon
                  name="comment-alt"
                  size={18}
                  style={styles.reactionIcon}
                />
              )}
              onPress={toggleComment}
            >
              Comment
            </Button>
          </View>
        </Card>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        enablePanDownToClose
        enableOverDrag={false}
        handleStyle={{
          backgroundColor: "#FAF7F0",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <BottomSheetScrollView
          bounces={false}
          style={{ flex: 1, backgroundColor: "#FAF7F0" }}
        >
          {!(
            (data.user.userName && data.user.userName === currentUsername) ||
            !data.user.userName
          ) && (
            <TouchableRipple
              style={styles.bottomSheetContent}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss(), toggleIsDialogVisible();
              }}
            >
              <Row style={{ alignItems: "center" }}>
                <Feather name="flag" size={20} color="red" />
                <Text
                  style={{ color: "red" }}
                  onPress={() => {
                    toggleIsDialogVisible(),
                      (
                        <Report
                          isVisible={isVisible}
                          toggleIsVisible={toggleIsDialogVisible}
                          postId={data.id}
                        />
                      );
                  }}
                >
                  Report
                </Text>
              </Row>
            </TouchableRipple>
          )}
          {((data.user.userName && data.user.userName === currentUsername) ||
            !data.user.userName) && (
            <TouchableRipple
              style={styles.bottomSheetContent}
              onPress={() => {}}
            >
              <Row style={{ alignItems: "center" }}>
                <MaterialIcons name="delete-outline" size={20} color="black" />
                <Text>Delete</Text>
              </Row>
            </TouchableRipple>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={toggleIsDialogVisible}>
          <Report
            isVisible={isDialogVisible}
            toggleIsVisible={toggleIsDialogVisible}
            postId={data.id}
          />
        </Dialog>
      </Portal>

      {isVisible && (
        <Comment
          isVisible={isVisible}
          toggleComment={toggleComment}
          postId={data.id}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  PostContainer: {
    width: "100%",
    backgroundColor: "white",
    // padding: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  Post: {
    paddingBottom: 5,
    paddingTop: 5,
    width: "100%",
    borderRadius: 0,
    backgroundColor: "white",
    justifyContent: "center",
  },
  postTop: {
    marginTop: 5,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    textAlign: "justify",
    color: "black",
    marginBottom: 8,
  },
  userName: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 10,
    height: 30,
  },

  Interactive: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  ImageBox: {
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  reportIcon: {
    margin: 0,
  },
  reactionIcon: {
    color: "grey",
  },
  bottomSheetContent: {
    padding: 10,
  },
  bottomSheetContentText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
