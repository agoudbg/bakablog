import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { pageList } from "../../src/utils/api";
import { useTheme } from "../utils/theme";

function PageListScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageList2, setPageList] = React.useState([]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    title: {
      width: "100%",
      fontSize: 20,
      fontWeight: "bold",
      paddingTop: 20,
      paddingBottom: 10,
      marginLeft: 28,
      borderBottomWidth: 1,
      color: theme.titleColor,
      borderBottomColor: theme.borderColor,
    },
    page: {
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 17,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
    },
    pageText: {
      fontSize: 16,
      color: theme.secondaryColor,
    },
  });

  React.useEffect(() => {
    pageList({}).then((data) => {
      setPageList(data);
    });
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行一次

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pageList({}).then((data) => {
      setPageList(data);
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
        {pageList2.map((page) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Article", {
                slug: page.slug,
              });
            }}
            style={styles.page}
          >
            <Text style={styles.pageText}>{page.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default PageListScreen;
