import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import PostsScreen from "../screens/PostsScreen";
import UserScreen from "../screens/UserScreen";
import AboutScreen from "../screens/AboutScreen";
import ResultScreen from "../screens/ResultScreen";
import NewPollScreen from "../screens/NewPollScreen";

const PostsStack = createStackNavigator(
  {
    Posts: PostsScreen,
    Result: ResultScreen,
    NewPoll: NewPollScreen
  },
  {
    initialRouteName: "Posts",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#e6e6fa",
        height: 50,
        padding: 15
      },
      headerTintColor: "#333",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "monospace"
      }
    }
  }
);

PostsStack.navigationOptions = {
  tabBarLabel: "Posts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-paper${focused ? "" : "-outline"}`
          : "ios-paper"
      }
    />
  )
};

const UserStack = createStackNavigator(
  {
    Me: UserScreen,
    Result: ResultScreen,
    NewPoll: NewPollScreen
  },
  {
    initialRouteName: "Me",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#e6e6fa",
        height: 50,
        padding: 15
      },
      headerTintColor: "#333",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "monospace"
      }
    }
  }
);

UserStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-contact${focused ? "" : "-outline"}`
          : "ios-contact"
      }
    />
  )
};

const AboutStack = createStackNavigator(
  {
    About: AboutScreen
  },
  {
    initialRouteName: "About",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#e6e6fa",
        height: 55,
        padding: 15
      }
    }
  }
);

AboutStack.navigationOptions = {
  tabBarLabel: "About",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default createBottomTabNavigator({
  PostsStack,
  UserStack,
  AboutStack
});
