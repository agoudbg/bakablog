import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { categoryList, tagCloud } from "../../src/utils/api";

function CategoryListScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [categorylist, setCategoryList] = React.useState([]);
  const [taglist, setTagList] = React.useState([]);

  React.useEffect(() => {
    categoryList({}).then((data) => {
      setCategoryList(data);
    });
    tagCloud({}).then((data) => {
      setTagList(data);
    });
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行一次

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    categoryList({}).then((data) => {
      setCategoryList(data);
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.title}>分类</Text>
        {categorylist.map((category) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter", {
                category: category.slug,
                categoryName: category.name,
              });
            }}
            style={styles.category}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
            <Text style={styles.categoryText}>{category.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.title}>标签</Text>
        {taglist.map((tag) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter", {
                tag: tag.name,
              });
            }}
            style={styles.category}
          >
            <Text style={styles.categoryText}>{tag.name}</Text>
            <Text style={styles.categoryText}>{tag.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  category: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CategoryListScreen;
