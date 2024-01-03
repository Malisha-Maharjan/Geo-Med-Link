import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export const ViewComment = (value: any) => {
  const data = value.value;
  return (
    <View style={styles.comment}>
      <Avatar.Image size={30} source={require("../../../mydp.png")} />
      <Text>{data.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
    gap: 10,
  },
});
