import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OptionsMenu from "react-native-options-menu";
import { Icon } from "expo";
const MoreIcon = require("../assets/images/more.png");
export default class PollTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon.FontAwesome name="user-circle" size={30} color="indigo" />
        <Text style={styles.txt}>
          {this.props.createdBy} @ {this.props.at}
        </Text>
        {this.props.options && (
          <OptionsMenu
            button={MoreIcon}
            buttonStyle={{
              width: 32,
              height: 8,
              margin: 7.5,
              resizeMode: "contain"
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

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
    borderBottomWidth: 2
  },
  txt: {
    fontSize: 18,
    paddingLeft: 5
  }
});
