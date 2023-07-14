import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import Colors from "../../constants/colors";

function Button({ title, src }) {
  // console.log(src);

  return (
    <>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.buttonStyle, styles.pressed] : styles.buttonStyle
          }
        >
          {src && <Image source={src} style={styles.image} />}
          <Text style={styles.textStyle}>{title} </Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    // backgroundColor: "red",
    overflow: "hidden",
  },
  buttonStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: Colors.primary_btn_color,
    padding: 20,
    borderWidth: 2,
    borderColor: "#f7b98d",
    borderRadius: 40,
  },
  textStyle: {
    color: Colors.font_color,
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    // backgroundColor: "white",
  },
  pressed: {
    opacity: 0.85,
  },

  image: {
    backgroundColor: "red",
    height: 30,
    width: 30,
    borderRadius: 30,
    padding: 5,
    marginRight: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});
export default Button;
