import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
export default class Option extends React.Component {
  handlePress = () => {
    this.props.handlePress(this.props.idx);
  };
  render() {
    const bgColor = this.props.checked ? "#afa" : "#889";
    const txtColor = this.props.checked ? "#333" : "#eee";
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: bgColor }]}
        onPress={this.handlePress}
      >
        {this.props.checked ? <Text>✅</Text> : <Text> </Text>}
        <Text style={[styles.text, { color: txtColor }]}>
          {this.props.value}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#557",
    margin: 5,
    borderRadius: 10,
    paddingLeft: 10
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: "#eee",
    fontWeight: "bold"
  }
});
