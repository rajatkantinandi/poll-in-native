import React from "react";
import { Icon } from "expo";
import PropTypes from "prop-types";
import { ColorMode } from "../constants/Colors";
export default class TabBarIcon extends React.Component {
  render() {
    const Colors = ColorMode.getColor();
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={35}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.greenBtn : Colors.darkbg}
      />
    );
  }
}
TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};
TabBarIcon.defaultProps = {
  name: "md-alert",
  focused: false
};
