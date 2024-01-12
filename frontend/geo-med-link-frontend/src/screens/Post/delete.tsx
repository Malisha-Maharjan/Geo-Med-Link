import React from "react";
// import { Button, Modal, StyleSheet, Text, View } from "react-native";

type DeleteParams = {
  isVisible: any;
  toggleIsVisible: () => void;
  postId: number;
};

import { View } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";
import { useDeletePost } from "~/hooks/post/useDeleteApi";

export const Delete = ({
  isVisible,
  toggleIsVisible: toggleIsVisible,
  postId,
}: DeleteParams) => {
  console.log({ postId });
  const { mutate: deletePost, error } = useDeletePost();
  const onPressYes = () => {
    toggleIsVisible();
    deletePost(postId);
  };
  const onPressNo = () => {
    toggleIsVisible();
  };
  return (
    <View>
      {/* <Dialog visible={isVisible} onDismiss={toggleIsVisible}> */}
      <Dialog.Title>Delete</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">Delete this post?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPressYes}>Yes</Button>
        <Button onPress={onPressNo}>No</Button>
      </Dialog.Actions>
      {/* </Dialog> */}
    </View>
  );
};
