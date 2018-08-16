import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import { ColorMode } from "../constants/Colors";
export default class StyledInput extends React.Component {
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      field: {
        flex: 0,
        flexDirection: "row",
        margin: 8,
        padding: 5,
        backgroundColor: Colors.bloodInput,
        borderRadius: 8,
        borderColor: Colors.fancyBorder,
        borderWidth: 1
      },
      input: {
        width: 250,
        padding: 4,
        fontSize: 18,
        marginLeft: 4,
        color: Colors.primaryText
      }
    });
    return (
      <View style={[styles.field, { backgroundColor: this.props.bgColor }]}>
        {this.props.icon}
        <TextInput
          style={[styles.input, { color: this.props.color }]}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize={this.props.autoCapitalize}
        />
      </View>
    );
  }
}
StyledInput.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string.isRequired
};
StyledInput.defaultProps = {
  placeholder: "Type Something...",
  onChangeText: null,
  autoCapitalize: "sentences"
};
