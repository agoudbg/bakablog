// In App.js in a new project

import * as React from "react";
import { View, Text, Button, ScrollView, Share, Image } from "react-native";

import env from "../utils/env";
import theme, { useTheme } from "../utils/theme";
import { getAppVersion } from "../utils/version";

function AboutScreen({ navigation }) {
  const theme = useTheme();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 100, height: 100, marginTop: 20, marginBottom: 20, borderRadius: 15, }}
        />
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            fontWeight: "bold",
            color: theme.textColor,
          }}
        >
          bakaBlog
        </Text>
        <Text
          selectable
          style={{ fontSize: 16, marginBottom: 20, color: theme.textColor }}
        >
          {getAppVersion()}
        </Text>
        <Button
          title={env.blogUrl}
          onPress={() => {
            Share.share({
              message: env.blogUrl,
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

export default AboutScreen;
