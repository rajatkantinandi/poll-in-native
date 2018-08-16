import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { ColorMode } from "../constants/Colors";
const Colors = ColorMode.getColor();

import TabBarIcon from "../components/TabBarIcon";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ResultScreen from "../screens/ResultScreen";
import DemoScreen from "../screens/DemoScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
    Result: ResultScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "DemoScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.demoTabbg,
        height: 35,
        padding: 5
      },
      headerTintColor: Colors.demoTabTint,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "monospace"
      }
    }
  }
);
export default createSwitchNavigator({
  AccessNav,
  DemoNav
});
