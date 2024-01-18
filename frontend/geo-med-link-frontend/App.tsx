import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "~/context/userContext";
import { useUser } from "~/hooks/user/useUser";
import { RootStackNavigator } from "~/navigations/Root/root-stack";
import { theme } from "~/theme/theme";

const queryClient = new QueryClient();
export default function App() {
  const paperTheme = { ...MD3LightTheme, colors: theme.light };
  const user = useUser();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider value={user}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={paperTheme}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
