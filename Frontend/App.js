import { StyleSheet, Text, View } from "react-native";

import Card from "./components/ui/Card";
import Registration from "./screens/Registration/Registration";
import UserRegistration from "./screens/Registration/UserRegistration";

export default function App() {
  return (
    <View style={styles.container}>
      <Card>
        {/* <Registration /> */}
        <UserRegistration />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4a9a5",
  },
});
