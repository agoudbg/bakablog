import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  View,
  useColorScheme,
  ScrollView,
  RefreshControl,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import AboutScreen from "./src/Screens/About";
import ArticleScreen from "./src/Screens/Article";
import CategoryListScreen from "./src/Screens/CategoryList";
import FilterScreen from "./src/Screens/Filter";
import PageListScreen from "./src/Screens/PageList";
import ArticleList from "./src/Shared/ArticleList";
import { MaterialHeaderButton } from "./src/Shared/HeaderButton";
import { getPosts } from "./src/utils/api";

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [isEnd, setIsEnd] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getPosts({ pageSize: 10, page: 1 }).then((data) => {
      setPosts(data);
      setIsEnd(data.length < 10);
      setPage(1);
      setLoading(false);
    });
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行一次

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    getPosts({ pageSize: 10, page: 1 }).then((data) => {
      setPosts(data);
      setRefreshing(false);
      setIsEnd(data.length < 10);
      setPage(1);
      setLoading(false);
    });
  }, []);

  const onLoadMore = () => {
    if (loading || isEnd) return;
    setPage(page + 1);
    setLoading(true);
    getPosts({ pageSize: 10, page: page + 1 }).then((data) => {
      setPosts([...posts, ...data]);
      setLoading(false);
      setIsEnd(data.length < 10);
    });
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: "主页",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={() => ({
          title: "分类",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="PageList"
        component={PageListScreen}
        options={() => ({
          title: "页面",
          tabBarIcon: ({ color, size }) => (
            <Icon name="paperclip" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function App() {
  const scheme = useColorScheme();

  const screens = [
    <Stack.Screen
      name="HomeTab"
      component={HomeTab}
      options={({ navigation }) => ({
        title: "bakaBlog",
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        // headerSearchBarOptions: {
        //   placeholder: "搜索",
        //   onChangeText: (text) => {
        //     navigation.navigate("HomeTab", { screen: "Home" });
        //     console.log(text);
        //   },
        //   cancelButtonText: "取消",
        // },
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
            <Item
              title="search"
              IconComponent={Platform.OS === "ios" ? IOSIcon : MaterialIcon}
              iconName={
                Platform.OS === "ios"
                  ? "ellipsis-horizontal-circle-outline"
                  : "more-vert"
              }
              onPress={() => navigation.navigate("About")}
            />
          </HeaderButtons>
        ),
      })}
    />,
    <Stack.Screen
      name="Filter"
      component={FilterScreen}
      options={() => ({
        title: "过滤",
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
      })}
    />,
    <Stack.Screen
      name="Article"
      component={ArticleScreen}
      options={() => ({
        title: "",
        headerBackTitle: "返回",
      })}
    />,
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={() => ({
        presentation: "modal",
        title: "关于",
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerBackVisible: true,
        headerBackTitle: "返回",
      })}
    />,
  ];

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={
          {
            // headerBackTitleVisible: false,
          }
        }
      >
        {screens}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
