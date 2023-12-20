import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Header } from "~/components";
import { Loader } from "~/helper/loader";
import { usePost } from "~/hooks/post/usePostApi";
import { useFetchUser } from "~/hooks/user/useUserApi";
import { TabNavigationProps } from "~/navigations/Bottom/bottom-stack.types";

export const UploadPost = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [postText, setPostText] = useState("");
  const navigation = useNavigation<TabNavigationProps>();
  const { mutate: postApi } = usePost();
  const { data: response, isLoading } = useFetchUser();
  const data = response?.data;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      if (result.assets[0].base64) setSelectedImage(result.assets[0].base64);
    }
  };
  const upload = () => {
    console.log("post post");
    navigation.navigate("Feed");
    setSelectedImage("");
    setPostText("");
    postApi({ post: postText, photo: selectedImage });
  };
  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <View style={styles.container}>
      <Header>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Avatar.Image size={32} source={require("../mydp.png")} />
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            {data.user.userName}
          </Text>
        </View>
        <Pressable style={styles.PostBtn} onPress={upload}>
          <Text style={styles.PostText}>Post</Text>
        </Pressable>
      </Header>
      {/* <Row style={styles.firstView}>
        <Avatar.Image size={32} source={require("../mydp.png")} />
        <Pressable style={styles.PostBtn} onPress={upload}>
          <Text style={styles.PostText}>Post</Text>
        </Pressable>
      </Row> */}
      <ScrollView>
        <TextInput
          style={styles.secondView}
          multiline={true}
          mode="flat"
          placeholder="Input your text here."
          value={postText}
          onChangeText={(text) => setPostText(text)}
        />
        <View style={styles.thirdView}>
          {selectedImage && (
            <Image
              source={{ uri: `data:image/png;base64,${selectedImage}` }}
              style={styles.selectedImage}
            />
          )}
          <Pressable style={styles.media} onPress={pickImage}>
            <Icon name="image" size={30}>
              {" "}
              Add Photo
            </Icon>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  PostBtn: {
    width: 60,
  },
  PostText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  secondView: {
    minHeight: 190,
    maxHeight: 800,
    paddingBottom: 10,
    // marginTop: 20,
  },

  thirdView: {
    alignItems: "center",
    marginBottom: 40,
    minHeight: 90,
    maxHeight: 900,
    // backgroundColor: "#5FBDFF",
    justifyContent: "center",
  },
  media: {
    width: "100%",
    // height: 90,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red"
  },
  selectedImage: {
    height: 150,
    width: 150,
    margin: 20,
  },
});
