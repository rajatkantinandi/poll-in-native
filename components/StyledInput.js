import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

export default class StyledInput extends React.Component {
  render() {
    return (
      <View style={[styles.field, { backgroundColor: this.props.bgColor }]}>
        {this.props.icon}
        <TextInput
          style={[styles.input, { color: this.props.color }]}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize={this.props.autoCapitalize || "none"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  field: {
    flex: 0,
    flexDirection: "row",
    margin: 10,
    padding: 5,
    backgroundColor: "#777",
    borderRadius: 10
  },
  input: {
    width: 300,
    padding: 5,
    fontSize: 18,
    marginLeft: 5,
    color: "white"
  }
});
