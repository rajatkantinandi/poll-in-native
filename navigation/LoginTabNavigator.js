import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ResultScreen from "../screens/ResultScreen";
import DemoScreen from "../screens/DemoScreen";

SignInScreen.navigationOptions = {
  tabBarLabel: "Sign In",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-log-in${focused ? "" : "-outline"}`
          : "ios-log-in"
      }
    />
  )
};
SignUpScreen.navigationOptions = {
  tabBarLabel: "Sign Up",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add-circle${focused ? "" : "-outline"}`
          : "ios-add-circle"
      }
    />
  )
};
const AccessNav = createBottomTabNavigator({
  SignInScreen,
  SignUpScreen
});
const DemoNav = createStackNavigator(
  {
    DemoScreen,
    Result: ResultScreen
  },
  {
    initialRouteName: "DemoScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "indigo",
        height: 50,
        padding: 15
      },
      headerTintColor: "#ddf",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "monospace"
      }
    }
  }
);
export default createSwitchNavigator({
  AccessNav,
  DemoNav
});
