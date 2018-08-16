import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { ColorMode } from "../constants/Colors";
const Colors = ColorMode.getColor();

import TabBarIcon from "../components/TabBarIcon";
import PostsScreen from "../screens/PostsScreen";
import UserScreen from "../screens/UserScreen";
import AboutScreen from "../screens/AboutScreen";
import ResultScreen from "../screens/ResultScreen";
import NewPollScreen from "../screens/NewPollScreen";
import ProfileScreen from "../screens/ProfileScreen";

const PostsStack = createStackNavigator(
  {
    Posts: PostsScreen,
    Result: ResultScreen,
    NewPoll: NewPollScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Posts",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.titleBarbg,
        height: 35,
        padding: 5
      },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
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
    NewPoll: NewPollScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Me",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.titleBarbg,
        height: 35,
        padding: 5
      },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
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
        backgroundColor: Colors.titleBarbg,
        height: 45,
        padding: 5
      },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "monospace"
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
