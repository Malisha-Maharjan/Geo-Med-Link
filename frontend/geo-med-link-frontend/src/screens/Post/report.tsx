import React from "react";
// import { Button, Modal, StyleSheet, Text, View } from "react-native";

type ReportParams = {
  isVisible: any;
  toggleIsVisible: () => void;
  postId: number;
};

import { View } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";
import { useReportPost } from "~/hooks/post/useReportApi";

export const Report = ({
  isVisible,
  toggleIsVisible: toggleIsVisible,
  postId,
}: ReportParams) => {
  console.log({ postId });
  const { mutate: reportPost, error } = useReportPost();
  const onPressYes = () => {
    toggleIsVisible();
    reportPost(postId);
  };
  const onPressNo = () => {
    toggleIsVisible();
  };
  return (
    <View>
      {/* <Dialog visible={isVisible} onDismiss={toggleIsVisible}> */}
      <Dialog.Title>Report</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">Do you want to report this post?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPressYes}>Yes</Button>
        <Button onPress={onPressNo}>No</Button>
      </Dialog.Actions>
      {/* </Dialog> */}
    </View>
  );
};
