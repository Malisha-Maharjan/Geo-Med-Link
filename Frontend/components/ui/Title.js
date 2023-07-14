import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Colors from "../../constants/colors";
import { Image } from "react-native";
function Title({ screen, src }) {
  //   console.log(src);
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleInnerContainer}>
        {src && <Image source={src} style={styles.image} />}
        <Text style={styles.titleText}>{screen}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    margin: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  titleInnerContainer: {
    // flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.title_background,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: Colors.title_border,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    color: "white",
  },
  image: {
    backgroundColor: "red",
    height: 50,
    width: 50,
    borderRadius: 30,
    padding: 5,
    marginRight: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});
export default Title;
