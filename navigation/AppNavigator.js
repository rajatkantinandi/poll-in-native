import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoginTabNavigator from "./LoginTabNavigator";

export default createSwitchNavigator({
  Login: LoginTabNavigator,
  Main: MainTabNavigator
});
