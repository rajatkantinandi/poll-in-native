import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import OptionsMenu from "react-native-options-menu";
import { Icon } from "expo";
const MoreIcon = require("../assets/images/more.png");
import PropTypes from "prop-types";
import { ColorMode } from "../constants/Colors";
export default class PollTitle extends React.Component {
  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 2,
        borderBottomWidth: 2,
        borderColor: Colors.fancyBorder
      },
      txt: {
        paddingLeft: 3,
        color: Colors.primaryText
      },
      hyperlnk: {
        paddingLeft: 3,
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.primaryText
      }
    });
    return (
      <View style={styles.container}>
        <Icon.FontAwesome
          name="user-circle"
          size={30}
          color={Colors.usericon}
        />
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("Profile", {
              username: this.props.createdBy
            })
          }
        >
          <Text style={styles.hyperlnk}>{this.props.createdBy}</Text>
        </TouchableHighlight>
        <Text style={styles.txt}>@ {this.props.at}</Text>
        {this.props.options && (
          <OptionsMenu
            button={MoreIcon}
            buttonStyle={{
              width: 32,
              height: 8,
              margin: 7.5,
              resizeMode: "contain",
              backgroundColor: "#ccc"
            }}
            destructiveIndex={1}
            options={this.props.options.labels}
            actions={this.props.options.actions}
          />
        )}
      </View>
    );
  }
}
PollTitle.propTypes = {
  createdBy: PropTypes.string.isRequired,
  at: PropTypes.string.isRequired
};
PollTitle.defaultProps = {
  createdBy: "Invalid user",
  at: "Undefined date"
};
