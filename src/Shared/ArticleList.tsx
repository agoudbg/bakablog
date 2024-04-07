import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableNativeFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Post } from "../types/api";
import getPostHeadImage from "../utils/getPostHeadImage";

// style

export default function ArticleList({
  navigation,
  posts,
  isEnd,
  loading,
}: {
  navigation: any;
  posts: Post[];
  isEnd: boolean;
  loading: boolean;
}) {
  return (
    <ScrollView style={styles.container}>
      {posts.map((item) => (
        <TouchableNativeFeedback
          key={item.cid}
          style={styles.item}
          onPress={() => {
            navigation.push("Article", { cid: item.cid });
          }}
        >
          <View style={styles.item}>
            {getPostHeadImage(item) ? (
              <Image
                source={{ uri: getPostHeadImage(item) }}
                style={styles.image}
              />
            ) : null}
            <Text style={styles.title}>{item.title}</Text>
            {getPostHeadImage(item) ? null : (
              <Text style={styles.preview}>
                {item.text.split("<!--more-->").length > 1
                  ? item.text
                    .split("<!--more-->")[0]
                    .split("\n")
                    .filter((i) => i !== "")
                    .join("\n")
                  : item.text.length > 100
                    ? item.text.slice(0, 100) + "..."
                    : item.text}
              </Text>
            )}
            <View style={styles.dateAuthorBox}>
              <View
                style={styles.iconInfoBox}
                accessibilityLabel={`发布日期：${item.date.year} 年 ${item.date.month} 月 ${item.date.day} 日`}
              >
                <Icon name="calendar" size={16} color="#000" />
                <Text style={styles.infoBoxText}>
                  {item.date.year}-{item.date.month}-{item.date.day}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.iconInfoBox}
                accessibilityLabel={`作者：${item.author[0].name}`}
                onPress={() => {
                  navigation.push("Filter", {
                    authorId: item.author[0].uid,
                    authorName: item.author[0].name,
                  });
                }}
              >
                <Icon name="user" size={16} color="#000" />
                <Text style={styles.infoBoxText}>{item.author[0].name}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
      {isEnd ? <Text style={styles.isEnd}>我是有底线的</Text> : null}
      {loading ? <Text style={styles.isEnd}>加载中...</Text> : null}
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  item: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    maxWidth: "100%",
    textAlign: "left",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 26,
  },
  preview: {
    fontSize: 15,
    color: "#333",
    marginTop: -4,
    marginBottom: 10,
    marginHorizontal: 15,
    lineHeight: 22,
  },
  dateAuthorBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconInfoBox: {
    color: "#000",
    marginHorizontal: 16,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoBoxText: {
    fontSize: 15,
    color: "#000",
    marginLeft: 5,
  },
  isEnd: {
    width: "100%",
    textAlign: "center",
    color: "#ccc",
    fontSize: 16,
    marginVertical: 20,
  },
});
