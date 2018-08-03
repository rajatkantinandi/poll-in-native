import React from "react";
import TitleBar from "../components/TitleBar";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <TitleBar />
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.p}>Version 1.2.0</Text>
        <Text style={styles.p}>Created on 04.08.18</Text>
        <Text style={styles.p}>
          - Rajat Kanti Nandi (https://twitter.com/rajatkantinandi)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.signInbg
  },
  p: {
    fontSize: 15,
    color: "white",
    margin: 3,
    padding: 2
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 5,
    padding: 2
  }
});
