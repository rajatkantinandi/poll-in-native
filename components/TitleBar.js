import React from "react";
import { View, Image } from "react-native";
import { Colors } from "../constants/Colors";

export default () => {
  return (
    <View
      style={{
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: Colors.titleBarbg,
        padding: 4
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 40 }}
      />
    </View>
  );
};
