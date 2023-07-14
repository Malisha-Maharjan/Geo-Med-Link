import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Colors from "../../constants/colors";
import { ScrollView } from "react-native";
function Card({ children }) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderColor: Colors.card_border,
    borderWidth: 2,
    borderRadius: 30,
    padding: 16,
    marginTop: 36,
    marginBottom: 30,
    width: "90%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card_color,
  },
});
export default Card;
