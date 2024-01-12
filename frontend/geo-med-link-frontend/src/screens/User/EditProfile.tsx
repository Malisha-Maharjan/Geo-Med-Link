import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import { useUserContext } from "~/context/userContext";
import { Loader } from "~/helper/loader";
import { useFetchUser } from "~/hooks/user/useUserApi";

export const EditProfile = () => {
  const { username } = useUserContext();
  const { data: response, isLoading } = useFetchUser(username);
  const data = response?.data;
  console.log({ data });
  if (isLoading) return <Loader />;

  if (!data) return <Text> No data</Text>;
  return (
    <>
      <ScrollView>
        <View style={style.topSection}>
          <View style={style.imageBox}>
            <Avatar.Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jw3DYEpt3FiWbJ2o9LFCU_J4oHfFCXNFVg&usqp=CAU",
              }}
              size={120}
            />
          </View>
          <Pressable style={style.changePicture}>
            <Text>Change Picture</Text>
          </Pressable>
        </View>
        <View style={style.inputBox}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>First Name</Text>
            <TextInput
              placeholder={data.firstName}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>Middle Name</Text>
            <TextInput
              placeholder={data.middleName === null ? "" : data.middleName}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>Last Name</Text>
            <TextInput
              placeholder={data.lastName}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>
              Contact Number
            </Text>
            <TextInput
              placeholder={data.phoneNumber === null ? "" : data.phoneNumber}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>Address</Text>
            <TextInput
              placeholder={data.user.address}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>Blood Group</Text>
            <TextInput
              placeholder={data.blood_Group === null ? "" : data.blood_Group}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 8, fontSize: 14 }}>Email</Text>
            <TextInput
              placeholder={data.user.email}
              mode="outlined"
              style={style.textInput}
              value={""}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Button
              mode="contained"
              style={{
                marginTop: 40,
                marginBottom: 20,
                width: 280,
                borderRadius: 8,
              }}
            >
              Save Changes
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  topSection: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#DBC0E8",
  },

  imageBox: {
    width: 125,
    height: 125,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 70,
    top: 40,
  },
  changePicture: {
    top: 45,
  },
  inputBox: {
    backgroundColor: "#FFE5E5",
    top: 90,
    width: "100%",
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: 350,
  },
});
