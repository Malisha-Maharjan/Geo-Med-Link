import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Avatar, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "~/components";
import { usePost } from "~/hooks/post/usePostApi";

export const UploadPost = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [postText, setPostText] = useState("");
  const { mutate: postApi } = usePost();

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
    // postApi({ post: postText, photo: selectedImage });
  };

  return (
    <View style={styles.container}>
      <Row style={styles.firstView}>
        <Avatar.Image size={32} source={require("../mydp.png")} />
        <Pressable style={styles.PostBtn} onPress={upload}>
          <Text style={styles.PostText}>Post</Text>
        </Pressable>
      </Row>
      <ScrollView>
        <TextInput
          style={styles.secondView}
          multiline={true}
          mode="outlined"
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
    marginTop: 20,
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
