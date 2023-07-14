import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Title from "../../components/ui/Title";
import images from "../../constants/images";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";

function UserRegistration() {
  return (
    <>
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <View>
            <Title screen="Register As User" src={images.userIcon} />
          </View>
          <ScrollView>
            <View>
              <View>
                <Text style={styles.text}>First Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.text}>Last Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                {/* <Text style={styles.text}>Gender</Text>
                <TextInput style={styles.input} /> */}
              </View>
              <View>
                <Text style={styles.text}>Age</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.text}>Date of Birth</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.text}>Email Address</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.text}>Address</Text>
                <TextInput style={styles.input} />
              </View>
              <Button title="Submit" />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: Colors.bg_color,
    margin: 10,
    padding: 20,
    borderRadius: 30,
  },
  text: {
    color: Colors.form_text,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
});
export default UserRegistration;
