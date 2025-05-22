// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Platform,
  Appearance,
} from "react-native";
import Markdown from "react-native-markdown-display";
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import WebView from "react-native-webview";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useHeaderHeight } from '@react-navigation/elements';

import { MaterialHeaderButton } from "../Shared/HeaderButton";
import { Post } from "../types/api";
import { single } from "../utils/api";
import getPostHeadImage from "../utils/getPostHeadImage";
import { useTheme } from "../utils/theme";

function ArticleScreen({ route, navigation }) {
  const cid = route.params.cid;
  const slug = route.params.slug;

  const [post, setPost]: [Post, any] = React.useState(null);

  const theme = useTheme();

  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    headerHeadImage: {
      height: 400,
      backgroundColor: theme.imageBackground,
      display: "flex",
      justifyContent: "flex-end",
      marginTop: Platform.OS === "ios" ? -headerHeight : 0,
    },
    header: {
      display: "flex",
      justifyContent: "flex-end",
    },
    image: {
      position: "absolute",
      width: "100%",
      height: 400,
      zIndex: -2,
    },
    shadow: {
      position: "absolute",
      width: "100%",
      height: 160,
      bottom: 0,
      zIndex: 0,
      resizeMode: "stretch",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.textColor,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
      userSelect: "auto",
    },
    iconInfoBox: {
      color: theme.secondaryColor,
      marginHorizontal: 20,
      marginBottom: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    iconInfoBoxIcon: {
      color: theme.secondaryColor,
    },
    infoBoxText: {
      fontSize: 16,
      color: theme.secondaryColor,
      marginLeft: 5,
    },
    category: {
      padding: 3,
      backgroundColor: theme.cardBackground,
      borderRadius: 5,
      marginLeft: 5,
    },
    categoryText: {
      fontSize: 15,
      color: theme.secondaryColor,
    },
    tagView: {
      margin: 20,
      display: "flex",
      flexDirection: "row",
    },
    tagTitleText: {
      fontSize: 16,
      color: theme.textColor,
      marginBottom: 10,
    },
    tagBox: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tag: {
      padding: 3,
      backgroundColor: theme.cardBackground,
      borderRadius: 5,
      marginRight: 5,
      marginBottom: 5,
    },
    tagText: {
      fontSize: 15,
      color: theme.secondaryColor,
    },
    moreHeader: {
      fontSize: 20,
      margin: 20,
      fontWeight: "bold",
    },
    webview: {
      flex: 1,
      height: 1000,
    },
  });

  const markDownStyles = StyleSheet.create({
    body: {
      fontSize: 16,
      margin: 20,
      lineHeight: 28,
      color: theme.textColor,
    },
    heading1: {
      fontSize: 32,
    },
    heading2: {
      fontSize: 24,
    },
    heading3: {
      fontSize: 18,
    },
    heading4: {
      fontSize: 16,
    },
    heading5: {
      fontSize: 13,
    },
    heading6: {
      fontSize: 11,
    },
    text: {
      fontSize: 16.6,
    },
    image: {
      borderRadius: 5,
      minHeight: 20,
      minWidth: "100%",
      backgroundColor: theme.imageBackground,
      overflow: "hidden",
    },
  });

  React.useEffect(() => {
    if (!cid && !slug) return;
    single({ cid, slug }).then((data) => {
      setPost(data);
    });
  }, [cid, slug]);

  if (!cid && !slug) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: theme.textColor }}>参数错误</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: theme.textColor }}>正在加载...</Text>
      </View>
    );
  }

  const share = () => {
    Share.share({
      message: Platform.OS === "ios" ? "" : post.permalink,
      url: post.permalink,
    });
  };

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          title="search"
          IconComponent={Platform.OS === "ios" ? IOSIcon : MaterialIcon}
          iconName={Platform.OS === "ios" ? "share-outline" : "share"}
          onPress={() => share()}
        />
        {/* <OverflowMenu
          OverflowIcon={({ color }) => {
            return Platform.OS === "ios" ? (
              <IOSIcon
                name="ellipsis-horizontal-circle-outline"
                size={23}
                color={color}
              />
            ) : (
              <MaterialIcon name="more-vert" size={23} color={color} />
            );
          }}
        >
          <HiddenItem title="hidden1" onPress={() => alert("hidden1")} />
          <Divider />
          <HiddenItem title="hidden2" onPress={() => alert("hidden1")} />
        </OverflowMenu> */}
      </HeaderButtons>
    ),
  });

  const rules = {
    textgroup: (
      node: { key: React.Key },
      children:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal,
      _parent: any,
      _myStyles: any,
      inheritedStyles = {},
    ) => {
      return (
        <Text
          key={node.key}
          style={[inheritedStyles, markDownStyles]}
          selectable
          selectionColor="#22A5F155"
        >
          {children}
        </Text>
      );
    },
  };

  const headImage = getPostHeadImage(post);

  const onScroll = (event) => {
    if (
      event.nativeEvent.contentOffset.y >
      (headImage ? 370 : 90)
      + (Platform.OS === "ios" ? (headImage ? -(headerHeight + 110) : -70) : 0)
    ) {
      navigation.setOptions({
        title: post.title,
      });
    } else {
      navigation.setOptions({
        title: "",
      });
    }

    if (event.nativeEvent.contentOffset.y > (headImage ? (headerHeight + 78) : -70)) {
      navigation.setOptions({
        headerBlurEffect: "systemMaterial",
        headerShadowVisible: true,
      });
    } else {
      navigation.setOptions({
        headerBlurEffect: "none",
        headerShadowVisible: false,
      });
    }
  };

  return (
    <ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentInsetAdjustmentBehavior="scrollableAxes"
      style={styles.container}
    >
      <View style={headImage ? styles.headerHeadImage : styles.header}>
        <Image source={{ uri: headImage }} style={styles.image} />
        <Image
          source={
            Appearance.getColorScheme() === "dark"
              ? require("../../assets/linear-gradient-black.png")
              : require("../../assets/linear-gradient-white.png")
          }
          style={styles.shadow}
        />
        <Text style={styles.title}>{post.title}</Text>
        <View
          style={styles.iconInfoBox}
          accessibilityLabel={`发布日期：${post.date.year} 年 ${post.date.month} 月 ${post.date.day} 日`}
        >
          <Icon name="calendar" size={16} style={styles.iconInfoBoxIcon} />
          <Text style={styles.infoBoxText}>
            {post.date.year}-{post.date.month}-{post.date.day}
          </Text>
        </View>
      </View>
      {post.categories?.length > 0 ? (
        <View style={styles.iconInfoBox}>
          <Icon
            name="list"
            size={16}
            style={styles.iconInfoBoxIcon}
            accessibilityLabel="类别："
          />
          {post.categories.map((category) => (
            <TouchableOpacity
              style={styles.category}
              key={category.mid}
              onPress={() =>
                navigation.push("Filter", {
                  category: category.directory,
                  categoryName: category.name,
                })
              }
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      <Markdown style={markDownStyles} rules={rules}>
        {post.text.replace("<!--more-->", "")}
      </Markdown>
      {post.tag?.length > 0 ? (
        <View style={styles.tagView}>
          <Text style={styles.tagTitleText}>标签</Text>
          <View style={styles.tagBox}>
            {post.tag.map((tag) => (
              <TouchableOpacity
                style={styles.tag}
                key={tag.name}
                onPress={() => { }}
              >
                <Text style={styles.tagText}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}
      <Text style={styles.moreHeader}>评论</Text>
      <WebView
        style={styles.webview}
        source={{
          html: /* html */ `
<html>
  <head>
    <meta charset="<?php $this->options->charset(); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
    <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v2/dist/waline.css"
    />
  </head>

  <body>
    <div id="waline"></div>
    <script>
    Waline.init({
      el: '#waline',
      serverURL: 'https://blog-comment.agou.im',
      path: '${post.pathinfo}',
    });
    </script>
  </body>
</html>
    `,
        }}
      />
    </ScrollView>
  );
}

export default ArticleScreen;
