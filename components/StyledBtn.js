import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";

export default class StyledBtn extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.btn, { backgroundColor: this.props.bgcolor,width:this.props.width }]}
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
const styles = StyleSheet.create({
  btn: {
    marginLeft: 15,
    backgroundColor: "lime",
    padding: 8,
    flex: 0,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: 1
  },
  txt: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight:"bold"
  }
});
