import React from "react";
import { View, Image } from "react-native";
import { ColorMode } from "../constants/Colors";

export default () => {
  const Colors = ColorMode.getColor();
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
