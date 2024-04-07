import * as React from "react";
import { View, ScrollView, RefreshControl } from "react-native";

import { getPosts } from "../../src/utils/api";
import ArticleList from "../Shared/ArticleList";

function FilterScreen({ navigation, route }) {
  const { authorId, authorName, category, categoryName, tag } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [isEnd, setIsEnd] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getPosts({ pageSize: 10, page: 1, authorId, category, tag }).then(
      (data) => {
        setPosts(data);
        setIsEnd(data.length < 10);
        setPage(1);
        setLoading(false);
      },
    );
  }, []);

  let title = "";
  if (authorId) {
    title = "作者: " + (authorName || authorId);
  }
  if (category) {
    title = "分类: " + (categoryName || category);
  } else if (tag) {
    title = "标签: " + tag;
  }

  if (title === "") {
    title = "文章";
  }

  navigation.setOptions({ title });

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    getPosts({ pageSize: 10, page: 1, authorId, category, tag }).then(
      (data) => {
        setPosts(data);
        setRefreshing(false);
        setIsEnd(data.length < 10);
        setPage(1);
        setLoading(false);
      },
    );
  }, []);

  const onLoadMore = () => {
    if (loading || isEnd) return;
    setPage(page + 1);
    setLoading(true);
    getPosts({ pageSize: 10, page: page + 1, authorId, category }).then(
      (data) => {
        setPosts([...posts, ...data]);
        setLoading(false);
        setIsEnd(data.length < 10);
      },
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      onScroll={({ nativeEvent }) => {
        if (
          nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
          nativeEvent.contentSize.height - 200
        ) {
          onLoadMore();
        }
      }}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ArticleList
          navigation={navigation}
          posts={posts}
          isEnd={isEnd}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}

export default FilterScreen;
