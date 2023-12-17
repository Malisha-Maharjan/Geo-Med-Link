import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, TouchableRipple } from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import { Header } from "~/components";
import { Loader } from "~/helper/loader";
// import { ProfileStackNavigationProps } from "~/navigations/Stack/Profile/profile-stack.types";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";
import { useFetchUser } from "../../hooks/user/useUserApi";
import { UserFeed } from "./userFeed";

export const Profile = () => {
  const { data: response, isLoading } = useFetchUser();
  const navigation = useNavigation<RootStackNavigationProps>();
  const [isVisible, setIsVisible] = useState(false);
  const data = response?.data;
  console.log({ data: data?.user?.username });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // bottomSheetModalRef.current?.close();
  const handlePress = () => {
    if (isVisible) bottomSheetModalRef.current?.dismiss();
    else bottomSheetModalRef.current?.present();
    setIsVisible((isVisible) => !isVisible);
    // bottomSheetModalRef.current?.present();
  };

  if (isLoading) return <Loader />;

  if (!data) return <Text> No data</Text>;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Profile</Text>
        <IconButton
          icon={() => (
            <Iconll
              name="menuunfold"
              size={20}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
          style={{ margin: 0 }}
          onPress={() => bottomSheetModalRef.current?.present()}
        />
      </Header>

      {<UserFeed />}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={() => setIsVisible(false)}
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
          <TouchableRipple
            style={style.bottomSheetContent}
            onPress={() => {
              bottomSheetModalRef.current?.dismiss(),
                navigation.navigate("ChangePassword");
            }}
          >
            <Text style={style.bottomSheetContentText}>Change Password</Text>
          </TouchableRipple>
          <TouchableRipple
            style={style.bottomSheetContent}
            onPress={() => {
              bottomSheetModalRef.current?.dismiss(),
                navigation.navigate("EditProfile");
            }}
          >
            <Text style={style.bottomSheetContentText}>Edit Profile</Text>
          </TouchableRipple>
        </BottomSheetScrollView>
      </BottomSheetModal>
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
    marginBottom: 5,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  bottomSheetContent: {
    padding: 10,
  },
  bottomSheetContentText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
