import React from "react";
import TitleBar from "../components/TitleBar";
import { View, Text, StyleSheet } from "react-native";
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <TitleBar />
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.p}>Version 1.0</Text>
        <Text style={styles.p}>Created on 30.07.18</Text>
        <Text style={styles.p}> - By Rajat Kanti Nandi (@rajatkantinandi)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777"
  },
  p: {
    fontSize: 20,
    color: "white",
    margin: 5,
    padding: 5
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
    padding: 5
  }
});
