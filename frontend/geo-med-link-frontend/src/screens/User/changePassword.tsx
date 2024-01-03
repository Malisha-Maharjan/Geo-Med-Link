import { ScrollView, StyleSheet, View } from "react-native";

import { useState } from "react";
import { Button, Card, HelperText, Text, TextInput } from "react-native-paper";
import { useChangePassword } from "~/hooks/user/usePasswordApi";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: changePassword, error } = useChangePassword();

  const hasError = () => {
    // console.log({ error: newPassword !== confirmPassword });
    return newPassword !== confirmPassword;
  };

  const disableButton = () => {
    return (
      currentPassword === "" ||
      newPassword === "" ||
      newPassword !== confirmPassword
    );
  };

  const handleChangePassword = () => {
    changePassword({ currentPassword, newPassword, confirmPassword });
    console.log("change password");
  };
  return (
    <>
      <ScrollView>
        <Card style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text variant="headlineSmall" style={styles.header}>
              Reset Password
            </Text>
            <TextInput
              placeholder="Current Password"
              mode="outlined"
              style={styles.textInput}
              value={currentPassword}
              onChangeText={(currentPassword) =>
                setCurrentPassword(currentPassword)
              }
            ></TextInput>
            <TextInput
              placeholder="New Password"
              mode="outlined"
              style={styles.textInput}
              value={newPassword}
              onChangeText={(newPassword) => setNewPassword(newPassword)}
            ></TextInput>
            <View style={styles.helperText}>
              <TextInput
                placeholder="Re-enter New Password"
                mode="outlined"
                value={confirmPassword}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              ></TextInput>
              <HelperText type="error" visible={hasError()}>
                Re-Entered password does not match.
              </HelperText>
            </View>
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
            <Button
              mode="contained"
              style={{ marginTop: 40, marginBottom: 20 }}
              disabled={disableButton()}
              onPress={handleChangePassword}
            >
              Save Changes
            </Button>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    margin: 20,
    // height: 400,
  },
  header: {
    fontWeight: "bold",
    margin: 20,
  },
  textInput: {
    margin: 10,
    width: 250,
    height: 50,
  },
  helperText: {
    margin: 10,
    width: 250,
    height: 50,
  },
});
