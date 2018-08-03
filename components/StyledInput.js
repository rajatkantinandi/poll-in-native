import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Colors";

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
          autoCapitalize={this.props.autoCapitalize || "sentences"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  field: {
    flex: 0,
    flexDirection: "row",
    margin: 8,
    padding: 5,
    backgroundColor: Colors.bloodInput,
    borderRadius: 8
  },
  input: {
    width: 250,
    padding: 4,
    fontSize: 18,
    marginLeft: 4,
    color: Colors.primaryText
  }
});
