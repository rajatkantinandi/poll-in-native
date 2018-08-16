import React from "react";
import TitleBar from "../components/TitleBar";
import { View, Text, StyleSheet } from "react-native";
import StyledBtn from "../components/StyledBtn";
import { ColorMode } from "../constants/Colors";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <TitleBar />
  };
  state = {
    theme: "light",
    Colors: ColorMode.getColor()
  };
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.signInbg
      },
      p: {
        fontSize: 15,
        color: Colors.primaryText,
        margin: 3,
        padding: 2
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.primaryText,
        textAlign: "center",
        margin: 5,
        padding: 2
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.p}>Version 1.2.0</Text>
        <Text style={styles.p}>Created on 04.08.18</Text>
        <Text style={styles.p}>
          - Rajat Kanti Nandi (https://twitter.com/rajatkantinandi)
        </Text>
        <StyledBtn
          bgcolor={Colors.bloodInput}
          txtColor={Colors.primaryText}
          title="Dark mode/Light Mode"
          onPress={() => {
            const theme = this.state.theme == "light" ? "dark" : "light";
            ColorMode.setColor(theme);
            this.setState({ Colors: ColorMode.getColor(), theme });
          }}
        />
      </View>
    );
  }
}
