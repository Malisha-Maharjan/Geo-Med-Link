import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, Surface, Text } from "react-native-paper";
import { UserFeed } from "./Post/Components/userFeed";

export const Profile = () => {
  const [isMyPost, setIsMyPost] = useState("true");

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={style.topSection}>
        <Avatar.Image
          source={{
            uri: "https://www.pngegg.com/en/png-zmypk",
          }}
          size={120}
        ></Avatar.Image>
        <View style={style.informationSection}>
          <Text style={{ margin: 5 }}>Name</Text>
          <Text>Username</Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <EvilIcons name="location" size={20} color="blue" />
            <Text>Address</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color="blue"
            />
            <Text>Email</Text>
          </View>
          <Divider horizontalInset={true} bold={true} />
        </View>
      </View>
      <Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Surface style={style.surface}>
          <Text>MyPost</Text>
        </Surface>
        <Surface style={style.surface}>
          <Text>Shared Post</Text>
        </Surface>
      </View>
      {<UserFeed />}
    </View>
  );
};

const style = StyleSheet.create({
  topSection: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  informationSection: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    marginBottom: 10,
  },
});
