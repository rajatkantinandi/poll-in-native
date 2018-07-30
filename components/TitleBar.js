import React from "react";
import { View, Image } from "react-native";
export default () => {
  return (
    <View
      style={{
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#e6e6fa",
        padding: 8
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 40 }}
      />
    </View>
  );
};
