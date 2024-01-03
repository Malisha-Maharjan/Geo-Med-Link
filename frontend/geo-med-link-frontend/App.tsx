import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "~/context/userContext";
import { useUser } from "~/hooks/user/useUser";
import { RootStackNavigator } from "~/navigations/Root/root-stack";

const queryClient = new QueryClient();
export default function App() {
  const user = useUser();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <UserContextProvider value={user}>
                  <RootStackNavigator />
                </UserContextProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
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
