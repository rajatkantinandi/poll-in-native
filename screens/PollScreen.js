import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Poll"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Post by User</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 30,
    color: "maroon"
  }
});
