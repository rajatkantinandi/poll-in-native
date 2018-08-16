import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import { ColorMode } from "../constants/Colors";
export default class StyledBtn extends React.Component {
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      btn: {
        marginLeft: 6,
        backgroundColor: Colors.greenBtn,
        padding: 6,
        flex: 0,
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 6,
        borderColor: Colors.fancyBorder,
        borderWidth: 1
      },
      txt: {
        paddingLeft: 4,
        fontWeight: "bold",
        fontSize: 17
      }
    });

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.btn,
          { backgroundColor: this.props.bgcolor, width: this.props.width }
        ]}
      >
        {this.props.activity && (
          <ActivityIndicator color={this.props.txtColor} size="small" />
        )}
        {this.props.icon}
        <Text style={[styles.txt, { color: this.props.txtColor }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
StyledBtn.propTypes = {
  bgcolor: PropTypes.string,
  txtColor: PropTypes.string,
  activity: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func
};
StyledBtn.defaultProps = {
  title: "Invalid button",
  onPress: null
};
