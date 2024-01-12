import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, Surface, Text } from "react-native-paper";

export const UserDetail = (userData: any) => {
  const data = userData.userData.userData;
  console.log({ data });

  return (
    <>
      <View style={style.topSection}>
        <View style={style.imageBox}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jw3DYEpt3FiWbJ2o9LFCU_J4oHfFCXNFVg&usqp=CAU",
            }}
            size={120}
          />
        </View>
        <View style={style.informationSection}>
          <Text style={style.fullName}>
            {data.firstName} {data.middleName !== null && data.middleName}{" "}
            {data.lastName}
          </Text>
          {/* <Text>{data.user.userName}</Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <EvilIcons name="location" size={20} color="blue" />
            <Text>{data.user.address}</Text>
          </View> */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color="blue"
            />
            <Text>{data.user.email}</Text>
          </View>
          <Divider
            horizontalInset={true}
            bold={true}
            style={{ marginBottom: 20 }}
          />
        </View>
      </View>
      <Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Surface style={style.surface}>
          <Text>My Post</Text>
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
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  fullName: {
    margin: 5,
    fontSize: 22,
    fontWeight: "700",
    color: "black",
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
    // marginBottom: 5,
  },
  imageBox: {
    width: 125,
    height: 125,
    borderWidth: 2,
    borderColor: "pink",
    borderRadius: 70,
  },
});
