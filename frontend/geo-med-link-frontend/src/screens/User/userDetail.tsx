import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, Surface, Text } from "react-native-paper";

export const UserDetail = (userData: any) => {
  const data = userData.userData.userData;
  console.log({ data });

  return (
    <>
      <View style={style.topSection}>
        <Avatar.Image
          source={{
            uri: "https://www.pngegg.com/en/png-zmypk",
          }}
          size={120}
        ></Avatar.Image>
        <View style={style.informationSection}>
          <Text style={{ margin: 5 }}>
            {data.firstName} {data.middleName !== null && data.middleName}{" "}
            {data.lastName}
          </Text>
          <Text>{data.user.userName}</Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <EvilIcons name="location" size={20} color="blue" />
            <Text>{data.user.address}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color="blue"
            />
            <Text>{data.user.email}</Text>
          </View>
          <Divider horizontalInset={true} bold={true} />
        </View>
      </View>
      <Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Surface style={style.surface}>
          <Text>MyPost</Text>
        </Surface>
      </View>
    </>
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
    marginBottom: 5,
  },
});
