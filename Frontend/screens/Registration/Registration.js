import { View } from "react-native";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import images from "../../constants/images";

function Registration() {
  // function handleUserRegistration(){

  // }
  return (
    <>
      <View>
        <Title screen="Registration" />
        <Button title="Register as User" src={images.userIcon} />
        <Button
          title="Register as Organization"
          src={images.organizationIcon}
        />
      </View>
      <View></View>
    </>
  );
}
export default Registration;
