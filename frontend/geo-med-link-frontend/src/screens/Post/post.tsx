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
  useTheme,
} from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "~/components";
import { useUserContext } from "~/context/userContext";
import { useToggleLike } from "~/hooks/post/useLikeApi";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";
import { Comment } from "./Comment/comment";
import { Delete } from "./delete";
import { Report } from "./report";

export const Post = (value: any) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [isReportDialogVisible, setIsReportDialogVisible] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { mutate: toggleLike } = useToggleLike();
  const { username: currentUsername } = useUserContext();
  const theme = useTheme();

  const toggleIsReportDialogVisible = () => {
    setIsReportDialogVisible(!isReportDialogVisible);
  };

  const toggleIsDeleteDialogVisible = () => {
    setIsDeleteDialogVisible(!isDeleteDialogVisible);
  };
  const data = value.value;
  // console.log({ data });

  const toggleComment = () => {
    setIsVisible(!isVisible);
  };

  const likePost = (postId: number) => {
    toggleLike(postId);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Card style={styles.Post}>
          <View style={styles.postTop}>
            <Pressable
              style={styles.postUser}
              onPress={() =>
                navigation.navigate("Profile", { username: data.userName })
              }
            >
              {data.user_photo === "" || data.user_photo === null ? (
                <View style={styles.defaultPicture}>
                  <Avatar.Image size={40} source={require("../mydp.png")} />
                </View>
              ) : (
                <Avatar.Image
                  size={40}
                  source={{ uri: `data:image/png;base64,${data.photo}` }}
                />
              )}

              <View style={styles.nameAndDateWrapper}>
                <Text style={styles.userName}>{data.userName}</Text>
                <Text variant="bodySmall">
                  {dayjs(data.post_date).format("MMM D, YYYY")}
                </Text>
              </View>
            </Pressable>
            <IconButton
              icon={() => (
                <Entypo name="dots-three-vertical" size={18} color="black" />
              )}
              onPress={() => bottomSheetModalRef.current?.present()}
              style={styles.reportIcon}
            />
          </View>
          <Card.Content>
            {data.post !== "" && (
              <Text variant="bodyLarge" style={styles.caption}>
                {data.post_post}
              </Text>
            )}
          </Card.Content>

          <View style={styles.ImageBox}>
            {data.post_photo !== null && data.post_photo !== "" && (
              <Card.Cover
                source={{
                  uri: `data:image/png;base64,${data.post_photo}`,
                }}
                style={{ borderRadius: 0 }}
              />
            )}
          </View>

          <View style={styles.Interactive}>
            <Button
              icon={() => (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Iconll
                    name={data.isLiked ? "like1" : "like2"}
                    size={18}
                    style={data.isLiked && { color: theme.colors.primary }}
                  />
                </View>
              )}
              onPress={() => likePost(data.post_id)}
            >
              <Text style={data.isLiked && { color: theme.colors.primary }}>
                Like
              </Text>
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
              <Text>Comment</Text>
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
            (data.userName && data.userName === currentUsername) ||
            !data.userName
          ) && (
            <TouchableRipple
              style={styles.bottomSheetContent}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss(),
                  toggleIsReportDialogVisible();
              }}
            >
              <Row style={{ alignItems: "center" }}>
                <Feather name="flag" size={20} color="red" />
                <Text style={{ color: "red" }}>Report</Text>
              </Row>
            </TouchableRipple>
          )}
          {((data.userName && data.userName === currentUsername) ||
            !data.userName) && (
            <TouchableRipple
              style={styles.bottomSheetContent}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss(),
                  toggleIsDeleteDialogVisible();
              }}
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
        <Dialog
          visible={isReportDialogVisible}
          onDismiss={toggleIsReportDialogVisible}
        >
          <Report
            isVisible={isReportDialogVisible}
            toggleIsVisible={toggleIsReportDialogVisible}
            postId={data.id}
          />
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={isDeleteDialogVisible}
          onDismiss={toggleIsDeleteDialogVisible}
        >
          <Delete
            isVisible={isDeleteDialogVisible}
            toggleIsVisible={toggleIsDeleteDialogVisible}
            postId={data.post_id}
          />
        </Dialog>
      </Portal>

      {isVisible && (
        <Comment
          isVisible={isVisible}
          toggleComment={toggleComment}
          postId={data.post_id}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  PostContainer: {
    width: "100%",
    backgroundColor: "#FBF9F1",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 3,
  },
  Post: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: "white",
  },
  postTop: {
    marginTop: 5,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:"#AAD7D9"
  },
  caption: {
    textAlign: "justify",
    color: "black",
    marginBottom: 8,
    fontSize: 15,
    // backgroundColor:'aqua',
    lineHeight: 18,
  },
  userName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  Interactive: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor:"#92C7CF",
    borderTopWidth: 1,
    borderTopColor: "#d9d9d9",
  },
  InteractiveFont: {
    fontSize: 12,
  },

  ImageBox: {
    width: "100%",
    justifyContent: "center",
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
  defaultPicture: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 25,
  },
  nameAndDateWrapper: {
    paddingLeft: 10,
  },
});
