// import { useNavigation } from "@react-navigation/native";
// import dayjs from "dayjs";
// import * as React from "react";
// import { Modal, Pressable, StyleSheet, View } from "react-native";
// import { Avatar, Card, Text } from "react-native-paper";
// import Iconll from "react-native-vector-icons/AntDesign";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import { Row } from "~/components";
// import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";
// import { Report } from "./report";

// export const Post = (value: any) => {
//   const navigation = useNavigation<RootStackNavigationProps>();
//   const [reportModalVisible, setReportModalVisible] = React.useState(false);

//   const toggleReportModal = () => {
//     setReportModalVisible(!reportModalVisible);
//   };
//   // console.log({ value });
//   const data = value.value;
//   // console.log("this is data");
//   // console.log(data);
//   return (
//     <>
//       <Card mode="contained" style={styles.post}>
//         <View style={styles.postTop}>
//           <View style={styles.dpName}>
//             <Avatar.Image size={40} source={require("../mydp.png")} />
//             <Text style={styles.Name}>{data.user.userName}</Text>
//             {__DEV__ && <Text>ID: {data.id}</Text>}
//           </View>
//           <Pressable onPress={toggleReportModal} style={styles.optionIcon}>
//             <Icon name="ellipsis-v" size={18} color="grey" />
//           </Pressable>
//         </View>
//         {data.post !== "" && (
//           <Card.Content>
//             <Text variant="bodyLarge" style={styles.caption}>
//               {data.post}
//             </Text>
//           </Card.Content>
//         )}
//         <Text variant="bodySmall" style={{ marginLeft: 18 }}>
//           {dayjs(data.date).format("MMM D, YYYY")}
//         </Text>
//         <View style={styles.ImageBox}>
//           {data.photo !== null && (
//             <Card.Cover
//               source={{
//                 uri: `data:image/png;base64,${data.photo}`,
//               }}
//               style={{ borderRadius: 0 }}
//             />
//           )}
//         </View>

//         <View style={styles.Interactive}>
//           <Row>
//             <Iconll name="like2" size={18} style={styles.reactionIcon} />
//             <Text>Like</Text>
//           </Row>
//           <Row>
//             <Icon name="comment-alt" size={18} style={styles.reactionIcon} />
//             <Text
//               onPress={() =>
//                 navigation.navigate("Comment", { postId: data.id })
//               }
//             >
//               Comment
//             </Text>
//           </Row>
//           <Row>
//             <Icon name="share-square" size={18} style={styles.reactionIcon} />
//             <Text>Share</Text>
//           </Row>
//         </View>
//       </Card>

//       <Modal visible={reportModalVisible} transparent animationType="slide">
//         <Report
//           isVisible={reportModalVisible}
//           toggleReportModal={toggleReportModal}
//         />
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   post: {
//     backgroundColor: "white",
//     padding: 10,
//   },
//   postTop: {
//     height: 40,
//     margin: 10,
//     // padding: 10,
//     paddingBottom: 0,
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   dpName: {
//     width: "auto",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   caption: {
//     paddingBottom: 10,
//   },
//   Name: {
//     color: "black",
//     fontWeight: "bold",
//     fontSize: 16,
//     paddingLeft: 10,
//     // backgroundColor: 'red',
//     height: 30,
//   },
//   Interactive: {
//     alignItems: "center",
//     flexDirection: "row",
//     margin: 10,
//     justifyContent: "space-between",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "red",
//     padding: 10,
//   },
//   countContainer: {
//     alignItems: "center",
//     padding: 10,
//   },
//   ImageBox: {
//     width: "100%",
//     // backgroundColor: 'red',
//     justifyContent: "center",
//     paddingRight: 15,
//     paddingLeft: 15,
//   },
//   optionIcon: {
//     paddingTop: 10,
//     // backgroundColor: 'red',
//     width: 15,
//   },
//   reactionIcon: {
//     color: "grey",
//   },
// });

import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Iconll from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome5";
import Iconlll from "react-native-vector-icons/Octicons";
import { Row } from "~/components";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";

export const Post = (value: any) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [reportModalVisible, setReportModalVisible] = React.useState(false);

  const toggleReportModal = () => {
    setReportModalVisible(!reportModalVisible);
  };
  // console.log({ value });
  const data = value.value;
  // console.log("this is data");
  // console.log(data);
  return (
    <>
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Card style={styles.Post}>
          <View style={styles.postTop}>
            <Pressable style={styles.postUser} onPress={() => {}}>
              <Avatar.Image size={40} source={require("../mydp.png")} />
              <Text style={styles.userName}>{data.user.userName}</Text>
            </Pressable>
            <Pressable onPress={toggleReportModal} style={styles.reportIcon}>
              <Iconlll name="report" size={18} color="grey" />
            </Pressable>
          </View>
          <Card.Content>
            {data.post !== "" && (
              <Text variant="bodyLarge" style={styles.caption}>
                {data.post}
              </Text>
            )}
            <Text variant="bodySmall">
              {dayjs(data.date).format("MMM D, YYYY")}
            </Text>
          </Card.Content>

          <View style={styles.ImageBox}>
            {data.photo !== null && data.photo !== "" && (
              <Card.Cover
                source={{
                  uri: `data:image/png;base64,${data.photo}`,
                }}
                style={{ borderRadius: 0 }}
              />
            )}
          </View>

          <View style={styles.Interactive}>
            <Row>
              <Iconll name="like2" size={18} style={styles.reactionIcon} />
              <Text>Like</Text>
            </Row>
            <Row>
              <Icon name="comment-alt" size={18} style={styles.reactionIcon} />
              <Text
                onPress={() =>
                  navigation.navigate("Comment", { postId: data.id })
                }
              >
                Comment
              </Text>
            </Row>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  PostContainer: {
    width: "100%",
    backgroundColor: "white",
    // padding: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  Post: {
    paddingBottom: 5,
    paddingTop: 5,
    width: "100%",
    borderRadius: 0,
    backgroundColor: "white",
    justifyContent: "center",
  },
  postTop: {
    marginTop: 5,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    textAlign: "justify",
    color: "black",
    marginBottom: 8,
  },
  userName: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 10,
    height: 30,
  },

  Interactive: {
    width: "100%",
    // paddingRight: 30,
    // paddingLeft: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  ImageBox: {
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  reportIcon: {
    paddingTop: 10,
    width: 40,
    alignItems: "center",
  },
  reactionIcon: {
    color: "grey",
  },
});
