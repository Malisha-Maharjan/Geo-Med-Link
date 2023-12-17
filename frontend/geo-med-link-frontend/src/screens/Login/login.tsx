import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useUserContext } from "~/context/userContext";
import { useLogin } from "~/hooks/user/useUserApi";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";

export const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setContextUsername, setToken: setContextToken } =
    useUserContext();

  const { mutateAsync: login, error } = useLogin();

  const onLoginClick = async () => {
    console.log({ username });
    const response = await login({ username, password });
    console.log({ response });
    console.log({ token: response.data.token });
    console.log({ response });
    setContextUsername(response.data.username);
    setContextToken(response.data.token);
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button mode="contained" onPress={onLoginClick}>
        Login
      </Button>
      <Text variant="bodyMedium">{error?.message}</Text>
    </View>
  );
};
