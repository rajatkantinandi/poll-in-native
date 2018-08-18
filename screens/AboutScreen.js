import React from "react";
import TitleBar from "../components/TitleBar";
import { View, Text, StyleSheet, Linking, Switch } from "react-native";
import { ColorMode } from "../constants/Colors";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <TitleBar />,
    title: "About",
    headerStyle: {
      backgroundColor: "#e6e6fa",
      height: 45,
      padding: 5
    },
    headerTintColor: "#333",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "monospace"
    }
  };
  state = {
    theme: "light"
  };
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.signInbg,
        padding: 5
      },
      p: {
        fontSize: 16,
        color: Colors.primaryText,
        margin: 3,
        padding: 2
      },
      p2: {
        fontSize: 16,
        color: Colors.primaryText,
        margin: 3,
        padding: 2,
        color: Colors.impTxt,
        fontWeight: "bold"
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.primaryText,
        textAlign: "center",
        marginBottom: 15
      },
      heading2: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primaryText,
        padding: 10
      },
      settings: {
        margin: 5,
        padding: 8,
        borderTopColor: Colors.fancyBorder,
        borderTopWidth: 2,
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.navyInput,
        borderRadius: 10
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.p}>Version 1.4.0</Text>
        <Text style={styles.p}>Created on 18.08.18</Text>
        <Text style={styles.p}>
          - Rajat Kanti Nandi (
          <Text
            onPress={() =>
              Linking.openURL("https://twitter.com/rajatkantinandi")
            }
            style={{ color: Colors.impTxt, fontWeight: "bold" }}
          >
            @rajatkantinandi
          </Text>
          )
        </Text>
        <Text
          onPress={() =>
            Linking.openURL("https://github.com/rajatkantinandi/poll-in-native")
          }
          style={styles.p2}
        >
          Contribute @ GitHub
        </Text>
        <Text
          onPress={() =>
            Linking.openURL(
              "https://github.com/rajatkantinandi/poll-in-native/releases"
            )
          }
          style={styles.p2}
        >
          Download latest version
        </Text>
        <View style={styles.settings}>
          <Text style={styles.heading2}>🌇 Night Mode </Text>
          <Switch
            onTintColor={Colors.impTxt}
            value={this.props.screenProps.theme == "dark"}
            onValueChange={async () => {
              await this.props.screenProps.changeTheme();
              this.setState({
                theme: this.props.screenProps.theme
              });
            }}
          />
        </View>
      </View>
    );
  }
}
