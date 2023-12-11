import dayjs from "dayjs";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Divider,
  MD2Colors,
  Text,
} from "react-native-paper";
import { useFetchNews } from "../hooks/news/useNewsApi";

export const News = () => {
  const { isLoading, data: response } = useFetchNews();
  const data = response?.data;
  console.log(data);
  if (isLoading)
    return (
      <View>
        <ActivityIndicator animating={true} color={MD2Colors.blue200} />
      </View>
    );
  return (
    <>
      <ScrollView>
        <View>
          {data.data.map((news: any) => (
            <View>
              <TouchableOpacity
                onPress={() => Linking.openURL(`${news.headline_link}`)}
                key={news.id}
                style={styles.container}
              >
                <View key={news.id}>
                  <Text
                    variant="titleLarge"
                    style={styles.headline}
                    onPress={() => Linking.openURL(`${news.headline_link}`)}
                  >
                    {news.headline}
                  </Text>
                  <Text>{dayjs(news.date).format("MMM D, YYYY")}</Text>
                  <Image
                    source={{ uri: news.image_url }}
                    style={styles.newsImage}
                  />
                  <Text variant="labelMedium">{news.paragraph}</Text>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  newsImage: {
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  headline: {
    fontWeight: "bold",
  },
});
