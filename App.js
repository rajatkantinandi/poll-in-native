import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { AppLoading, Asset, Font, Icon, Constants } from "expo";
import { createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./navigation/MainTabNavigator";
import LoginTabNavigator from "./navigation/LoginTabNavigator";
import { ColorMode } from "./constants/Colors";
const Colors = ColorMode.getColor();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    appNavigator: null,
    theme: "light",
    changeTheme: async () => {
      const theme = this.state.theme == "light" ? "dark" : "light";
      this.setState({ theme });
      ColorMode.setColor(theme);
      await AsyncStorage.setItem("theme", theme);
    }
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <this.state.appNavigator
            screenProps={{
              theme: this.state.theme,
              changeTheme: this.state.changeTheme
            }}
          />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/logo.png")]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    const username = await AsyncStorage.getItem("authUser");
    const userId = await AsyncStorage.getItem("authUserId");
    const theme = await AsyncStorage.getItem("theme");
    let alpha = "Login";
    if (username && userId) {
      alpha = "Main";
    }
    if (theme) {
      ColorMode.setColor(theme);
    }
    this.setState({
      isLoadingComplete: true,
      theme: theme,
      appNavigator: createSwitchNavigator(
        {
          Login: LoginTabNavigator,
          Main: MainTabNavigator
        },
        {
          initialRouteName: alpha
        }
      )
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightbg,
    marginTop: Constants.statusBarHeight
  }
});
