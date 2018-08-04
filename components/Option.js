import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import PropTypes from "prop-types";
export default class Option extends React.Component {
  handlePress = () => {
    this.props.handlePress(this.props.idx);
  };
  render() {
    const bgColor = this.props.checked
      ? Colors.optionbgChecked
      : Colors.optionbg;
    const txtColor = this.props.checked
      ? Colors.optiontxtChecked
      : Colors.optiontxt;
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
Option.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};
Option.defaultProps = {
  value: "Undefined",
  handlePress: () =>
    alert("Error: no pressHandler provided to the options obj!")
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    padding: 6,
    backgroundColor: Colors.optionbg,
    margin: 4,
    borderRadius: 8,
    paddingLeft: 5
  },
  text: {
    marginLeft: 3,
    color: Colors.optiontxt,
    fontWeight: "bold"
  }
});
