import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Avatar, Searchbar, Text } from "react-native-paper";
import { Header, Row } from "~/components";
import { useDebounce } from "~/hooks/search/useDebounce";
import { useSearchFetch } from "~/hooks/search/useSearchApi";
import { RootStackNavigationProps } from "~/navigations/Root/root-stack.types";

type Response = {
  id: number;
  userName: string;
  photo: string;
};

export const Search = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: response, error, isLoading } = useSearchFetch(debouncedSearch);
  // console.log(data?.data);
  const data = response?.data;
  // if (isLoading) return <Loader />;

  return (
    <>
      <View>
        <Header style={{ alignItems: "center", gap: 5 }}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate("BottomTab")}
          />
          <Searchbar
            placeholder="Search"
            value={searchValue}
            style={{
              flexShrink: 1,
              maxHeight: 35,
            }}
            inputStyle={{
              maxHeight: 25,
              bottom: 12,
              right: 10,
              color: "#607274",
            }}
            onPressIn={() => true}
            onChangeText={(searchValue) => setSearchValue(searchValue)}
            autoFocus
          />
        </Header>
        {isLoading ? (
          <View>
            <Text>Loading..</Text>
          </View>
        ) : (
          <View>
            {data.map((item: Response) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Profile", { username: item.userName })
                }
              >
                <Row>
                  {item.photo === "" || item.photo === null ? (
                    <Avatar.Image size={40} source={require("../mydp.png")} />
                  ) : (
                    <Avatar.Image
                      size={40}
                      source={{ uri: `data:image/png;base64,${item.photo}` }}
                    />
                  )}

                  <Text>{item.userName}</Text>
                </Row>
              </Pressable>
            ))}
          </View>
        )}
        {error && (
          <View>
            <Text>{error.message}</Text>
          </View>
        )}
      </View>
    </>
  );
};
