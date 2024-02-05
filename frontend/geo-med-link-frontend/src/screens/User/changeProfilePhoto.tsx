import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabNavigationProps } from "~/navigations/Bottom/bottom-stack.types";

export const ChangeProfilePicture = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [postText, setPostText] = useState("");
  const navigation = useNavigation<TabNavigationProps>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      if (result.assets[0].base64) setSelectedImage(result.assets[0].base64);
    }
  };

  const canPost = () => {
    return postText !== "" || selectedImage !== "";
  };

  const upload = () => {
    console.log("post post");
    navigation.navigate("Feed");
    setSelectedImage("");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {selectedImage && (
          <Image
            source={{ uri: `data:image/png;base64,${selectedImage}` }}
            style={styles.selectedImage}
          />
        )}
        <Pressable onPress={pickImage}>
          <View style={styles.imageUpload}>
            <Icon name="image" size={30} color="rgb(124, 117, 126)"></Icon>
            {!selectedImage ? (
              <Text variant="bodyMedium"> Add Photo</Text>
            ) : (
              <Text variant="bodyMedium">Change Photo</Text>
            )}
          </View>
        </Pressable>
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
  imageUpload: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgb(237, 221, 246)",
    padding: 10,
  },
  selectedImage: {
    height: 150,
    width: 150,
    margin: 20,
  },
});
